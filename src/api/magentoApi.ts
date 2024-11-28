const MAGENTO_BASE_URL = 'https://meetanshi.in/latest/rest/V1';

/**
 * Website:                    https://meetanshi.com/magento-2-demo
 * magento webiste:            https://meetanshi.in/latest/
 * magento website admin page: https://meetanshi.in/latest/admin/admin/
 * Username:                   meetanshi
 * Password:                   demo@123
 */

export const loginUser = async (email: string, password: string): Promise<string> => {
  const url = `${MAGENTO_BASE_URL}/integration/customer/token`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
  };

  const body = JSON.stringify({ username: email, password });

  try {
    const response = await fetch(url, { method: 'POST', headers, body });

    console.log("SANJEEV", response)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const token = await response.text(); // Magento returns the token as plain text.
    return token;
  } catch (error) {
    console.log("SANJEEV", error)
    throw new Error(error.message || 'An unexpected error occurred');
  }
};