$('#addT').show();
$('#updateT').hide();
$('#addButton').show();
$('#updateButton').hide();

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//Get All Data
function allData() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/teacher/all',
        success: function (response) {
            let data = '';
            $.each(response, function (key, value) {
                data += '<tr>'
                data += '<td>' + value.id + '</td>'
                data += '<td>' + value.name + '</td>'
                data += '<td>' + value.title + '</td>'
                data += '<td>' + value.institute + '</td>'
                data += '<td>'
                data += '<button class="btn btn-sm btn-primary mr-2" onclick="editData(' + value.id + ')">Edit</button>'
                data += '<button class="btn btn-sm btn-danger" onclick="deleteData(' + value.id + ')">Delete</button>'
                data += '</td>'
                data += '</tr>'
            })
            $('tbody').html(data);
        }
    })
}
allData();


//clear input field
function clearData() {
    $('#name').val('');
    $('#title').val('');
    $('#institute').val('');
    $('#nameError').text('');
    $('#titleError').text('');
    $('#instituteError').text('');
}


//Add Data
function addData() {
    let name = $('#name').val();
    let title = $('#title').val();
    let institute = $('#institute').val();

    let formData = {
        name: name,
        title: title,
        institute: institute
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: formData,
        url: '/teacher/store',
        success: function (data) {
            clearData();
            allData();
            //Sweet Alert
            const Msg = Swal.mixin({
                toast: true,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            Msg.fire({
                type: 'success',
                title: 'Data Added Successfully',
            });
        },
        error: function (error) {
            $('#nameError').text(error.responseJSON.errors.name);
            $('#titleError').text(error.responseJSON.errors.title);
            $('#instituteError').text(error.responseJSON.errors.institute);
        }
    })
}


//Edit Data
function editData(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/teacher/edit/' + id,
        success: function (data) {
            $('#addT').hide();
            $('#updateT').show();
            $('#addButton').hide();
            $('#updateButton').show();

            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#title').val(data.title);
            $('#institute').val(data.institute);
            console.log(data);
        }
    })
}



//Update Data
function updateData() {
    let id = $('#id').val();
    let name = $('#name').val();
    let title = $('#title').val();
    let institute = $('#institute').val();

    let formData = {
        name: name,
        title: title,
        institute: institute
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: formData,
        url: 'teacher/update/' + id,
        success: function (response) {
            $('#addT').show();
            $('#updateT').hide();
            $('#addButton').show();
            $('#updateButton').hide();

            clearData();
            allData();

            //Sweet Alert
            const Msg = Swal.mixin({
                toast: true,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            Msg.fire({
                type: 'success',
                title: 'Data Updated Successfully',
            });
        },
        error: function (error) {
            $('#nameError').text(error.responseJSON.errors.name);
            $('#titleError').text(error.responseJSON.errors.title);
            $('#instituteError').text(error.responseJSON.errors.institute);
        }
    })
}


//Delete Data
function deleteData(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger mr-3'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
            title: 'Are you sure to delete?',
            text: "Once deleted, ou won't be able to recover this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
    })
    .then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/teacher/destroy/' + id,
                success: function (response) {
                    allData();
                    console.log('deleted');
                }
            })
            //Sweet Alert
            const Msg = Swal.mixin({
                toast: true,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            Msg.fire({
                type: 'success',
                title: 'Data Added Successfully',
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}
