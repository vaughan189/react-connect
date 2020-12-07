export function setUserDetails(userDetails: any) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
};

export function getUserDetails() {
    return localStorage.getItem('userDetails') || '{}';
};


export function removeUserDetails() {
    localStorage.removeItem("userDetails");
}