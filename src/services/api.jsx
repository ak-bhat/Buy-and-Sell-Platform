const API_BASE = 'https://ads.planetmedia.app';
const API_KEY = 'f0cd6856-f2af-4af8-a858-3df7e3aba29b';  // Added this to .env for security but facing some issues while fetching data

export const registerUser = async (data) => {
  console.log(JSON.stringify(data));
  
  const res = await fetch(`${API_BASE}/api/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(data)    
  });
  console.log(res);
  
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData.error.message);
    
    throw new Error(errorData.error.message || "Failed to register");
  }
  return res.json();

};


export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to login');
  return res.json();
};


export const getUserAds = async (jwt, userId) => {
  const res = await fetch(`${API_BASE}/api/advertisements`, {
    headers: {
      'x-api-key': API_KEY,
      'Authorization': `Bearer ${jwt}`,
    }
  });

  if (!res.ok) throw new Error('Failed to fetch ads');

  const allAds = await res.json();
  return allAds.filter(ad => ad.owner?.id === userId);
};

export const getAds = async () => {
  const res = await fetch(`${API_BASE}/api/advertisements`, {
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) throw new Error("Failed to load ads");
  return res.json();
};


export const getAdDetails = async (id) => {
  const res = await fetch(`${API_BASE}/api/advertisements/${id}`, {
    headers: { 'x-api-key': API_KEY }
  });
  if (!res.ok) throw new Error('Failed to load ad details');
  return res.json();
};

export const createAd = async (adData, jwt) => {
  const res = await fetch(`${API_BASE}/api/advertisements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(adData),
  });

  if (!res.ok) throw new Error('Failed to create ad');
  return res.json();
};

export const deleteAd = async (adId, jwt) => {
  const res = await fetch(`${API_BASE}/api/advertisements/${adId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'x-api-key': API_KEY,
    },
  });
  if (!res.ok) throw new Error('Failed to delete ad');
  return res.json();
};



export const getUserProfile = async (jwt) => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
      'x-api-key': API_KEY,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
};


export const updateUserProfile = async (userData, jwt) => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'Authorization': `Bearer ${jwt}`,

    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to update user profile');
  return res.json();
};


