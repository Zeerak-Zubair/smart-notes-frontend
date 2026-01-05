import { useState } from "react";
import type { FormEvent } from "react";
import { signup } from "../../services/supabase/auth.service";
import { createUser } from "../../services/supabase/users.service";
import { uploadImage } from "../../services/supabase/storage.service";
import { data } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: authData, error: authError } = await signup({
        email,
        password,
      });

      console.log(data);
      console.log(error);

      if (authError) throw authError;

      let avatarUrl = "";

      if (image && authData.user) {
        const { publicUrl } = await uploadImage({
          file: image,
          bucket: "smart_notes",
          userId: authData.user.id,
        });

        avatarUrl = publicUrl;
      }

      const { error: userError } = await createUser({
        name,
        email,
        avatar_url: avatarUrl,
      });

      if (userError) throw userError;

      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setImage(null);
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Account created successfully! Please check your email to verify your
          account.
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
