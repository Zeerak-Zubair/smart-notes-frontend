import { useState, type FormEvent } from "react";
import { ProfileApiService } from "../../services/api/profile.api";
import { useParams } from "react-router";

// interface EditProfileProps {
//   profile_id: number;
// }

const EditProfile = () => {
  // Hardcoded values for testing
  const { id } = useParams(); //profile id

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!image) {
      setError("Profile image is required");
      return;
    }


    try {
      if (name) {
        await ProfileApiService.updateProfile(id!, { name });
      }
      
      if (image) {
        await ProfileApiService.updateProfilePicture(image);
      }

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred during profile update");
    }
  };

  return (
    <>
      <h1>Edit Profile</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="image">
          Profile Image
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default EditProfile;
