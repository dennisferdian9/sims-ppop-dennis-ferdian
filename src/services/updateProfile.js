import axios from "axios";

export const updateProfile = async (token, firstName, lastName) => {
  try {
    const endpoint = import.meta.env.VITE_API_ENDPOINT
    const response = await axios.put(endpoint + '/profile/update', {
      first_name: firstName,
      last_name: lastName,
    }, {
      headers : {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export const updateProfileImage = async (token, file) => {
  try {
    if (typeof file === 'string') {
      return
    }
    const endpoint = import.meta.env.VITE_API_ENDPOINT
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(endpoint + '/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.error('Update profile image error:', error);
    throw error;
  }
};
