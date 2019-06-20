import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function LoginValidators(email: string, password: string) {
    return (formGroup: FormGroup) => {
        const emailControl = formGroup.controls[email];
        const pwdControl = formGroup.controls[password];
        if (emailControl.value !== 'user') {
            emailControl.setErrors({ emailInvalid: true });
        }
        if(pwdControl.value !== 'svn') {            
            pwdControl.setErrors({ passwordInvalid: true });
        }
    }
}
