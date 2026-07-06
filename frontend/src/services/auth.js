import api from "./api";

// export const loginUser = async (username, password) => {
//   const response = await api.post("login/", {
//     username,
//     password,
//   });

//   return response.data;
// };





export const getProfile = async () => {
    const response = await api.get("profile/");
    return response.data;
};

export const updateProfile = async (formData) => {
    const response = await api.put(
        "profile/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};



export const registerUser = async (userData) => {
  const response = await api.post("register/", userData);
  return response.data;
};






export const loginUser = async (credentials) => {
  const response = await api.post("login/", credentials);
  return response.data;
};