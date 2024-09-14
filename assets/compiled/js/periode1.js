$(document).ready(function () {
  $("#table1").DataTable();
});

const page = "tahun_logic.php";

$(document).on("click", "#btnTambahTahun", function () {
  $("#simpanTahun")[0].reset();
});

$(document).on("submit", "#simpanTahun", function (e) {
  e.preventDefault();

  if (validateForm()) {
    const formData = new FormData(this);
    formData.append("tambahTahun", true);

    $.ajax({
      type: "POST",
      url: page,
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function () {
        $("#btn-simpan1").addClass("d-none");
        $("#btn-simpan2").removeClass("d-none");
      },
      success: function (response) {
        try {
          const res = jQuery.parseJSON(response);
          const st = res.status == 200 ? "success" : "error";
          Toast.fire({
            icon: st,
            title: res.message,
          });

          if (res.status == 200) {
            $("#table1").load(location.href + " #table1", function () {
              $("#loading-overlay").hide();
            });
          }
        } catch (err) {
          Toast.fire({
            icon: "error",
            title: "Server terputus...",
          });
        } finally {
          $("#btn-simpan2").addClass("d-none");
          $("#btn-simpan1").removeClass("d-none");
          $("#tambahTahunModal").modal("hide");
          $("#loading-overlay").show();
        }
      },
    });
  }
});

$(document).on("click", ".btn-danger", function () {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-lg btn-success ms-2 px-4",
      cancelButton: "btn btn-lg btn-danger px-3",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Anda yakin?",
      text: "Data akan terhapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        const id = $(this).val();
        $.ajax({
          type: "GET",
          url: `${page}?id=${id}`,
          beforeSend: function () {
            $("#loading-overlay").show();
          },
          success: function (response) {
            const res = jQuery.parseJSON(response);
            if (res.status == 200) {
              $("#table1").empty();

              Toast.fire({
                icon: "success",
                title: res.message,
              });
              $("#table1").load(location.href + " #table1", function () {
                table = $("#table1").DataTable({
                  destroy: true,
                });
                $("#loading-overlay").hide();
              });
            } else {
              Toast.fire({
                icon: "error",
                title: res.message,
              });
            }
          },
        });
      }
    });
});

function validateForm() {
  const yearInput = document.getElementById("year").value;
  const yearRange = yearInput.split("-");

  const startYear = parseInt(yearRange[0], 10);
  const endYear = parseInt(yearRange[1], 10);

  if (
    isNaN(startYear) ||
    isNaN(endYear) ||
    startYear >= endYear ||
    yearRange.length !== 2
  ) {
    Toast.fire({
      icon: "error",
      title: "Tahun harus sesuai!",
    });
    return false;
  }
  return true;
}
