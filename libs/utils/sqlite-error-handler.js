export default (error) => {
    console.log(error);
    if (error.includes('FOREIGN KEY'))
        return 'One key is missing or you are removing a master record';

    else if (error.includes('UNIQUE'))
        return 'This record already exists.';

    else if (error.includes('NOT NULL'))
        return 'Missing: ' + error.split('.')[1]

    else return '';
}