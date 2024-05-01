const message = {
    "AUTH":{
        "LOGIN": {
            "SUCCESS": "Login successful!",
            "INVALID_CREDENTIALS": "Invalid credential",
            "NOT_EXISTS": "User not exist"
        },
        "SIGNUP": {
            "SUCCESS": "Signup successful!",
            "ALREADY_EXISTS": "User already exists"
        },
        "CHANGE_PASSWORD": {
            "SUCCESS": "Password change successfully",
            "CURRENT_PASSWORD_INVALID": "Current password is invalid"
        },
        "UPDATE_PROFILE": {
            "SUCCESS": "Profile Updated Successfully!",
            "ALREADY_EXISTS": "Email already exists"
        }
    },
    "FORM_VALIDATIONS": {
        "EMAIL": {
            "REQUIRED":"Email is required",
            "INVALID": "Invalid email format"
        },
        "PASSWORD": {
            "REQUIRED":"Password is required",
            "LENGTH": "Password is required and must be at least 8 characters long",
            "MIN_LENGTH": "Password must be at least 8 characters long"
        },
        "FIRST_NAME": {
            "REQUIRED":"First name is required",
        },
        "LAST_NAME": {
            "REQUIRED":"Last name is required",
        },
        "MOBILE": {
            "REQUIRED":"Mobile number is required",
            "INVALID":"Mobile number is invalid",
        },
        "CONFIRM_PASSWORD": {
            "REQUIRED":"Confirm Password is required",
            "NOT_MATCH": "Passwords do not match"
        },
        "CURRENT_PASSWORD": {
            "REQUIRED":"Current Password is required",
            "LENGTH": "Current Password is required and must be at least 8 characters long"
        },
        "NEW_PASSWORD": {
            "REQUIRED":"New Password is required",
            "LENGTH": "New Password is required and must be at least 8 characters long",
            "MIN_LENGTH": "New Password must be at least 8 characters long"
        },
    }
}

export { message };