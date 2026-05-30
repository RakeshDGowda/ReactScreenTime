import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./SignupPage.css";
import user from "../../assets/user.webp";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../../utils/api-client";
import { authService } from "../../services/authService";

const roles = ["Parent", "Child"] as const;

const schema = z
  .object({
    userName: z
      .string()
      .min(3, { message: "Name should be at least 3 characters." }),
    email: z.string().email({ message: "Please enter valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    familyId: z.union([z.string(), z.number()]).optional(),
    role: z.enum(roles, {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password does not match Password.",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "Child") {
        return !!data.familyId;
      }
      return true;
    },
    {
      path: ["familyId"],
      message: "Family is required for Child",
    },
  );

type RegisterFormData = z.infer<typeof schema>;

const SignupPage = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [families, setFamilies] = useState([]);
  const [formerror, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const selectedRole = watch("role");

  useEffect(() => {
    const fetchFamilies = async () => {
      const res = await apiClient.get("/Family");
      setFamilies(res.data);
    };

    fetchFamilies();
  }, []);

  const onSubmit = (data: RegisterFormData) => {
    try {
      const formData = new FormData();

      formData.append("UserName", data.userName);
      formData.append("Email", data.email);
      formData.append("Password", data.password);
      formData.append("Role", data.role);

      if (data.familyId !== undefined && data.familyId !== "") {
        formData.append("FamilyId", String(Number(data.familyId)));
      }

      // ✔️ FIXED NAME
      if (profilePic) {
        formData.append("ProfilePicture", profilePic);
      }

      authService.register(formData);

      // navigate("/");
      //window.location.href = "/";
      //window.location.assign("/");
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setProfilePic(file);
              }
            }}
            id="file-ip-1"
            className="image_input"
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="userName">Name</label>
            <input
              id="userName"
              className="form_text_input"
              type="text"
              placeholder="Enter your userName"
              {...register("userName")}
            />
            {errors.userName && (
              <em className="form_error">{errors.userName.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select className="products_sorting" id="" {...register("role")}>
              <option value="">Select Role</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
            </select>
            {errors.role && <em>{errors.role.message}</em>}
          </div>

          {/* {selectedRole === "Child" && ( */}
          <div>
            <label>Family</label>

            <select
              className="products_sorting"
              {...register("familyId")}
              onChange={(e) => {
                const value = e.target.value;
                setValue("familyId", value ? Number(value) : undefined);
              }}
            >
              <option value="">Select Family</option>

              {families.map((f: any) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>

            {errors.familyId && <em>{errors.familyId.message}</em>}
          </div>
          {/* )} */}
        </div>

        {formerror && <em className="form_error">{formerror} </em>}

        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
