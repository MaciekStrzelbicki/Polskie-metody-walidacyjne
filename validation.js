//Dowód osobisty
$.validator.methods.do = function (value, element) {
    if (value == null || value.length != 9)
        return false;

    let numer = value.toUpperCase();
    let letterValues = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    function getLetterValue(letter) {
        for (let j = 0; j < letterValues.length; j++)
            if (letter == letterValues[j])
                return j;
        return -1;
    }

    //seria
    for (let i = 0; i < 3; i++)
        if (getLetterValue(numer[i]) < 10)
            return false;
    //number
    for (let i = 3; i < 9; i++)
        if (getLetterValue(numer[i]) < 0 || getLetterValue(numer[i]) > 9)
            return false;

    //cyfra kontrolna
    let sum = 7 * getLetterValue(numer[0]) +
        3 * getLetterValue(numer[1]) +
        1 * getLetterValue(numer[2]) +
        7 * getLetterValue(numer[4]) +
        3 * getLetterValue(numer[5]) +
        1 * getLetterValue(numer[6]) +
        7 * getLetterValue(numer[7]) +
        3 * getLetterValue(numer[8]);
    sum %= 10;
    if (sum != getLetterValue(numer[3]))
        return false;
    return true;
}

//pesel
$.validator.methods.pesel = function (value, element) {
    let year = parseInt(value.substring(0, 2), 10);
    let month = parseInt(value.substring(2, 4), 10) - 1;
    if (month > 80) {
        year = year + 1800;
        month = month - 80;
    } else if (month > 60) {
        year = year + 2200;
        month = month - 60;
    } else if (month > 40) {
        year = year + 2100;
        month = month - 40;
    } else if (month > 20) {
        year = year + 2000;
        month = month - 20;
    } else {
        year += 1900;
    }

    let importances = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];
    let sum = 0;
    for (let i = 0; i < importances.length; i++) {
        sum += (parseInt(value.substring(i, i + 1), 10) * importances[i]);
    }
    suma = suma % 10;
    let valid = (sum === parseInt(value.substring(10, 11), 10));

    if (valid && value.length == '11') {
        return true;
    } else {
        return false;
    }
}

//numer telefonu
$.validator.methods.phone = function (value) {
    let phone = value.replace(/[ -]/g, "");
    let re = /^[0-9]{9}$/;
    return re.test(String(phone));
}

//e-mail
$.validator.methods.email = function (value) {
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return re.test(String(value).toLowerCase());
}

//kod pocztowy
$.validator.methods.kodPocztowy = function (value) {
    let re = /\d{2}-\d{3}/;
    return re.test(String(value));
}

//tylko znaki alfanumeryczne
$.validator.methods.lettersonly = function (value) {
    let re = /^[A-Za-z\s-ążćńłóęźĄŻĆŃŁÓĘŹ]+$/;
    return re.test(String(value));
}

//tylko cyfry
$.validator.methods.digitsonly = function (value) {
    let re = /^[0-9]*$/;
    return re.test(String(value));
}

//numer KRS (Krajowy Rejestr Sądowy)
$.validator.methods.krs = function (value) {
    let re = /^[0-9]*$/;
    if (re.test(String(value)) && value.length == '10') {
        return true;
    } else {
        return false;
    }
    // return re.test(String(value));
}

//Numer NIP
$.validator.methods.nipnumber = function (nip) {
    if (typeof nip !== "string") {
        return false;
    }
    let nipWithoutDashes = nip.replace(/-/g, "");
    let reg = /^[0-9]{10}$/;
    if (reg.test(nipWithoutDashes) === false) {
        return false;
    } else {
        let dig = ("" + nipWithoutDashes).split("");
        let control = (6 * parseInt(dig[0]) + 5 * parseInt(dig[1]) + 7 * parseInt(dig[2]) + 2 * parseInt(dig[3]) + 3 * parseInt(dig[4]) + 4 * parseInt(dig[5]) + 5 * parseInt(dig[6]) + 6 * parseInt(dig[7]) + 7 * parseInt(dig[8])) % 11;
        if (parseInt(dig[9]) == control) {
            return true;
        } else {
            return false;
        }
    }
}

//Numer Regon
$.validator.methods.regon = function (regon) {
    let n = regon.length;
    let w;
    let cd = 0;
    let isOnlyDigit = /^\d+$/.test(regon);

    if (n == 9 || n == 14 && isOnlyDigit) {
        if (n === 9) {
            w = [8, 9, 2, 3, 4, 5, 6, 7];
        } else {
            w = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
        }
        for (let i = 0; i < n - 1; i++) {
            cd += w[i] * parseInt(regon.charAt(i));
        }

        cd %= 11;
        if (cd === 10) {
            cd = 0;
        }

        if (cd !== parseInt(regon.charAt(n - 1))) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }

}

//Numer budynku
$.validator.methods.buildingnumber = function (value) {
    if (value.indexOf('/') > -1) {
        var re = /^[1-9]{1,}[0-9a-zA-ZàáâäãåąćęèéêëìíîïłńòóôöõøùúûüÿýżźñçčšśžÀÁÂÄÃÅĄĆĘÈÉÊËÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŸÝŻŹŚÑßÇŒÆČŠŽ∂ð]*[/\-]{0,1}[0-9a-zA-ZàáâäãåąćęèéêëìíîïłńòóôöõøùúûüÿýżźñçčšśžÀÁÂÄÃÅĄĆĘÈÉÊËÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŸÝŻŹŚÑßÇŒÆČŠŽ∂ð]*$/;
    } else {
        var re = /^[1-9]{1,}[0-9a-zA-ZàáâäãåąćęèéêëìíîïłńòóôöõøùúûüÿýżźñçčšśžÀÁÂÄÃÅĄĆĘÈÉÊËÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŸÝŻŹŚÑßÇŒÆČŠŽ∂ð]*$/;
    }

    if (re.test(value) || value == '') {
        return true;
    } else {
        return false;
    }
}

//Numer lokalu
$.validator.methods.localnumber = function (value) {
    let re = /^[1-9]{1,}[0-9a-zA-ZàáâäãåąćęèéêëìíîïłńòóôöõøùúûüÿýżźñçčšśžÀÁÂÄÃÅĄĆĘÈÉÊËÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŸÝŻŹŚÑßÇŒÆČŠŽ∂ð]*$/;
    if (re.test(value) || value == '') {
        return true;
    } else {
        return false;
    }
}