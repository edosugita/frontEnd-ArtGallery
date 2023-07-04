export const validatePassword = (password) => {
    let passwordIsValid = true
    let passwordErrors = []

    if (password === "") {
        passwordIsValid = false;
        passwordErrors.push("");
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        passwordIsValid = false;
        passwordErrors.push("Password must contain a combination of uppercase and lowercase letters.");
    }else if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(password)) {
        passwordIsValid = false;
        passwordErrors.push("Password must contain a combination of letters and numbers.");
    }else if (!/(?=.*[@#$%^&+=!])(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
        passwordIsValid = false;
        passwordErrors.push("Password must contain at least one special character, such as @, #, or $.");
    } else if (password.length < 8) {
        passwordIsValid = false;
        passwordErrors.push("Password must be at least 8 characters long.");
    } else if (password.length > 16) {
        passwordIsValid = false;
        passwordErrors.push("Password must be at most 16 characters long.");
    }

    return { passwordIsValid, passwordErrors };
}

export const validateCpassword = (password, cpassword) => {
    let cpasswordIsValid = true
    let cpasswordErrors = []

    if (cpassword === "") {
        cpasswordIsValid = false;
        cpasswordErrors.push("");
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(cpassword)) {
        cpasswordIsValid = false;
        cpasswordErrors.push("Password must contain a combination of uppercase and lowercase letters.");
    }else if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(cpassword)) {
        cpasswordIsValid = false;
        cpasswordErrors.push("Password must contain a combination of letters and numbers.");
    }else if (!/(?=.*[@#$%^&+=!])(?=.*[a-zA-Z])(?=.*\d)/.test(cpassword)) {
        cpasswordIsValid = false;
        cpasswordErrors.push("Password must contain at least one special character, such as @, #, or $.");
    } else if (cpassword.length < 8) {
        cpasswordIsValid = false;
        cpasswordErrors.push("Password must be at least 8 characters long.");
    } else if (cpassword.length > 16) {
        cpasswordIsValid = false;
        cpasswordErrors.push("Password must be at most 16 characters long.");
    } else if (password !== cpassword) {
        cpasswordIsValid = false;
        cpasswordErrors.push("Password are not the same.");
    }

    return { cpasswordIsValid, cpasswordErrors };
}

export const validateUsername = (username) => {
    let usernameIsValid = true
    let usernameErrors = []

    if (username === "") {
        usernameIsValid = false;
        usernameErrors.push("");
    } else if (username.length < 3) {
        usernameIsValid = false;
        usernameErrors.push("Username must be at least 3 characters long");
    }  else if (username.length > 6) {
        usernameIsValid = false;
        usernameErrors.push("Username must be at most 6 characters long");
    }

    return { usernameIsValid, usernameErrors };
}

export const validateEmail = (email) => {
    let emailIsValid = true
    let emailErrors = []

    if (email === "") {
        emailIsValid = false;
        emailErrors.push("");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailIsValid = false
        emailErrors.push("Invalid email format")
    }

    return { emailIsValid, emailErrors };
}

export const validatePhone = (phone) => {
    let phoneIsValid = true
    let phoneErrors = []

    if (phone === "") {
        phoneIsValid = false;
        phoneErrors.push("");
    } else if (!/^[0-9]+$/.test(phone)) {
        phoneIsValid = false
        phoneErrors.push("Invalid phone format")
    } else if (phone.length < 11) {
        phoneIsValid = false;
        phoneErrors.push("Phone number must be at least 10 characters long");
    }  else if (phone.length > 12) {
        phoneIsValid = false;
        phoneErrors.push("Phone number must be at most 12 characters long");
    }

    return { phoneIsValid, phoneErrors };
}