const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

$(document).ready(function () {
  $(document).on("click", "#btnTambahTahun", function () {
    $("#simpanTahun")[0].reset();
    $("#tahunModalLabel").text("Tambah Tahun");
    $("#tahunModal").modal("show");
  });

  $(document).on("click", "#btnAtur", function () {
    $("#simpanPeriode")[0].reset();

    $.ajax({
      url: "tahun_logic.php?action=getAllTahun",
      method: "GET",
      dataType: "json",
      success: function (datas) {
        if (datas.length < 1) {
          Swal.fire({
            icon: "error",
            title: "Data tidak tersedia!",
            text: "Tidak dapat menentukan periode!",
          });
          return;
        }
        const selectTahun = $(".form-select");
        selectTahun.empty();
        datas.forEach((data) => {
          const option = $("<option>").text(data.nama_tahun);
          if (data.status === "Aktif") option.prop("selected", true);
          selectTahun.append(option);
          $("#periodeModal").modal("show");
        });
      },
    });
  });

  const dataTable = $("#tabelTahun").DataTable({
    ajax: {
      url: "tahun_logic.php?action=getAllTahun",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "nama_tahun" },
      { data: "status" },
      {
        data: null,
        render: function (data, type, row) {
          return (
            '<button class="edit btn btn-success" data-id="' +
            row.id_tahun +
            '">Edit</button> ' +
            '<button class="delete btn btn-danger" data-id="' +
            row.id_tahun +
            '" data-status="' +
            row.status +
            '">Delete</button>'
          );
        },
      },
    ],
    drawCallback: function () {
      $("#loading-overlay").addClass("d-none");
    },
    initComplete: function (settings, json) {
      $("#loading-overlay").addClass("d-none");
    },
    createdRow: function (row, data, dataIndex) {
      const statusColumn = $(row).find("td:eq(2)");
      const statusSpan = $("<span></span>").text(data.status);
      statusColumn.empty().append(statusSpan);

      statusSpan.addClass(
        `badge text-bg-${data.status === "Aktif" ? "success" : "secondary"}`
      );
    },
  });

  dataTable.on("preXhr.dt", function () {
    $("#btn-simpan2").addClass("d-none");
    $("#btn-simpan1").removeClass("d-none");
    $("#loading-overlay").removeClass("d-none");
  });

  $("#simpanTahun").submit(function (e) {
    e.preventDefault();
    if (validateForm()) {
      $("#tahunModal").modal("hide");
      $("#btn-simpan1").addClass("d-none");
      $("#btn-simpan2").removeClass("d-none");
      const formData = $(this).serialize();
      const tahunId = $("#tahunId").val();
      if (tahunId) {
        saveTahun(formData);
      } else {
        saveTahun(formData);
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Data tidak sesuai.",
      });
    }
  });

  $("#simpanPeriode").submit(function (e) {
    e.preventDefault();
  });

  $("#tabelTahun").on("click", ".edit", function () {
    const tahunId = $(this).data("id");
    getTahun(tahunId);
  });

  $("#tabelTahun").on("click", ".delete", function () {
    st = $(this).data("status");
    if (st === "Aktif") {
      Swal.fire({
        icon: "error",
        title: "Tahun aktif!",
        text: "Tidak dapat menghapus tahun ini!",
      });
      return;
    }
    Swal.fire({
      title: "Anda yakin?",
      text: "Data akan terhapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        const tahunId = $(this).data("id");
        deleteTahun(tahunId);
      }
    });
  });

  function getTahun(tahunId) {
    $.ajax({
      url: "tahun_logic.php?action=getTahun&id=" + tahunId,
      method: "GET",
      dataType: "json",
      success: function (data) {
        $("#tahunId").val(data.id_tahun);
        $("#year").val(data.nama_tahun);
        $("#status").val(data.status);
        $("#tahunModalLabel").text("Edit Tahun");
        $("#tahunModal").modal("show");
      },
    });
  }

  function saveTahun(formData) {
    $.ajax({
      url: "tahun_logic.php?action=saveTahun",
      method: "POST",
      data: formData,
      success: function (res) {
        dataTable.ajax.reload();
        Toast.fire({
          icon: "success",
          title: "Data berhasil tersimpan",
        });
      },
    });
  }

  function deleteTahun(tahunId) {
    $.ajax({
      url: "tahun_logic.php?action=deleteTahun&id=" + tahunId,
      method: "GET",
      success: function () {
        dataTable.ajax.reload();
        Toast.fire({
          icon: "success",
          title: "Data berhasil terhapus.",
        });
      },
    });
  }
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
    yearRange.length !== 2 ||
    endYear - startYear != 1
  ) {
    Toast.fire({
      icon: "error",
      title: "Format tahun tidak sesuai!",
    });
    return false;
  }
  return true;
}
