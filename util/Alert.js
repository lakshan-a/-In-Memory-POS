function saveUpdateAlert(vale, value2) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: vale + ' has been ' + value2,
        showConfirmButton: false,
        timer: 2500
    });
}

function unSucsessUpdateAlert(vale) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: vale + 'Updated Unsuccessfully',
        showConfirmButton: false,
        timer: 1500
    })
}