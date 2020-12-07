import { removeUserDetails } from "./localStorage.service";

export default function logout() {
    removeUserDetails();
}