

export default function ColorName(code){
    
    if(code.includes('#')){
        code = code.substring(1);
    }

    code = code.toUpperCase();

    let ans = 'Desconocido';

    switch (code) {
        case '000000':  // C1
            ans = 'Negro'
            break;

        case '333333':
            ans = 'Carbon'
            break;

        case '4D4D4D':
            ans = 'Gris Oscuro'
            break;

        case '666666':  // C2
            ans = 'Gris Fuerte'
            break;

        case '808080':
            ans = 'Gris'
            break;

        case '999999':
            ans = 'Gris M'
            break;

        case 'B3B3B3':  // C3
            ans = 'Gris Claro'
            break;

        case 'CCCCCC':
            ans = 'Gris Suave'
            break;

        case 'FFFFFF':
            ans = 'Blanco'
            break;

        case '9F0500':  // C4
            ans = 'Rojo Fuerte'
            break;

        case 'D33115':
            ans = 'Rojo Manzana'
            break;

        case 'F44E3B':
            ans = 'Coral'
            break;

        case 'C45100':  // C5
            ans = 'Terracota'
            break;

        case 'E27300':
            ans = 'Naranja Fuerte'
            break;

        case 'FE9200':
            ans = 'Naranja'
            break;

        case 'FB9E00':  // C6
            ans = 'Naranja Suave'
            break;

        case 'FCC400':
            ans = 'Amarillo Fuerte'
            break;

        case 'FCDC00':
            ans = 'Amarillo'
            break;

        case '808900':  // C7
            ans = 'Pantano'
            break;

        case 'B0BC00':
            ans = 'Verde Mostaza'
            break;

        case 'DBDF00':
            ans = 'Mostaza'
            break;

        case '194D33':  // C8
            ans = 'Verde Oscuro'
            break;

        case '68BC00':
            ans = 'Verde Hoja'
            break;

        case 'A4DD00':
            ans = 'Verde Manzana'
            break;

        case '0C797D':  // C9
            ans = 'Turquesa Oscuro'
            break;

        case '16A5A5':
            ans = 'Turquesa'
            break;

        case '68CCCA':
            ans = 'Turquesa Pastel'
            break;

        case '0062B1':  // C10
            ans = 'Azul'
            break;

        case '009CE0':
            ans = 'Azul Suave'
            break;

        case '73D8FF':
            ans = 'Celeste'
            break;

        case '653294':  // C11
            ans = 'Violeta'
            break;

        case '7B64FF':
            ans = 'Lila'
            break;

        case 'AEA1FF':
            ans = 'Lila Pastel'
            break;

        case 'AB149E':  // C12
            ans = 'Magenta Oscuro'
            break;

        case 'FA28FF':
            ans = 'Rosa'
            break;

        case 'FDA1FF':
            ans = 'Rosa Pastel'
            break;

        default:
          return 'Desconocido'
    }

    return ans;
}