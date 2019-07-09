let email = prompt('Please enter your email:');

if (email === null || email === '') {
    alert('Cancelled');
} else {
    let six = 6;
    if (email.length < six) {
        alert('I don\'t know any emails having name length less than 6 symbols');
    } else if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
        let password = prompt('Please enter your password:');
        if (password === null || password === '') {
            alert('Cancelled');
        } else {
            if (
                email === 'user@gmail.com' && password === 'UserPass' ||
                email === 'admin@gmail.com' && password === 'AdminPass'
            ) {
                let result = confirm('Do you want to change your password?');
                if (!result) {
                    alert('You have failed the change.');
                } else {
                    let oldpassword = prompt('Please enter your old password:');
                    if (
                        email === 'user@gmail.com' && oldpassword === 'UserPass' ||
                        email === 'admin@gmail.com' && oldpassword === 'AdminPass'
                    ) {
                        let newpassword = prompt('Please enter your new password:');
                        let five = 5;
                        if (newpassword.length < five) {
                            alert('It’s too short password. Sorry.');
                        } else {
                        let confirmpassword = prompt(
                            'Please enter confirm your password:'
                        );
                        if (newpassword !== confirmpassword) {
                            alert('You wrote the wrong password.');
                        } else {
                            alert('You have successfully changed your password');
                        }
                        }
                    } else {
                        alert('Wrong password');
                    }
                }
            } else {
                alert('Wrong password');
            }
        }
    } else {
        alert('I don’t know you');
    }
}
