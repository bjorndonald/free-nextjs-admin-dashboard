import axios from 'axios';
import Cookies from 'js-cookie';

const apiInstance = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your Golang API URL
});

// Attach the access token to every request
apiInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken');
        console.log(accessToken)
        if (accessToken) {
            config.headers.Authorization ="Bearer "+ accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh token interceptor
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If access token expired
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const response = await axios.post(
                    'http://localhost:8000/api/v1/auth/refresh-token',
                    {}, // Body is empty because the refresh token is in cookies
                    { withCredentials: true }
                );

                // Save the new access token
                Cookies.set('accessToken', response.data.accessToken, {
                    expires: 1 / 24,
                    // sameSite: "strict",
                    // secure: false
                });

                // Retry the original request
                originalRequest.headers.Authorization = response.data.accessToken;
                return apiInstance(originalRequest);
            } catch (refreshError) {
                // Logout the user if token refreshing fails
                Cookies.remove('accessToken');

                window.location.href = '/auth/signin'; // Redirect to login page
            }
        }

        return Promise.reject(error);
    }
);

export interface APIResponse<T> {
    success: boolean
    message: string
    data: T
}

export default apiInstance;