<!-- Ini Harus ada -->
<link rel="stylesheet" href="assets/extensions/datatables.net-bs5/css/dataTables.bootstrap5.min.css">
<link rel="stylesheet" href="./assets/compiled/css/loader.css">

<!-- Loader -->
<div id="loading-overlay">
  <div id="loading">
    <img src="/assets/compiled/png/loader2.gif" alt="Loading...">
  </div>
</div>


<div class="row">
  <div class="col-12 col-md-6 order-md-1 order-last">
    <h3>Periode</h3>
    <br>
  </div>
  <div class="col-12 col-md-6 order-md-2 order-first">
    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
        <li class="breadcrumb-item active" aria-current="page">Periode</li>
      </ol>
    </nav>
  </div>
</div>
<section class="section">
  <div class="card">
    <div class="card-header">
      <div class="row me-1">
        <h5 class="card-title col-11">
          Tahun Ajaran
        </h5>
        <button type="button" id="btnTambahTahun" class="col-1 btn btn-primary" data-bs-toggle="modal" data-bs-target="#tahunModal">Tambah</button>
      </div>
    </div>
    <div class="card-body">
      <table id="tabelTahun" class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Tahun Ajaran</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>

  </div>
  <button class="btn btn-primary" id="btnAtur">Atur Periode</button>
</section>

<!-- Modal -->
<div class="modal fade" id="tahunModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="tahunModalLabel">Tambah Tahun Ajaran</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="simpanTahun" method="POST">
        <div class="modal-body">
          <div class="mb-3">
            <label for="year" class="form-label"></label>
            <input type="text" class="d-none" id="tahunId" value="" name="tahunId" />
            <input type="text" id="year" value="" name="year" class="form-control" placeholder="contoh., 2023-2024" required>
            <input type="text" class="d-none" id="status" value="Tidak Aktif" name="status" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          <button type="submit" id='btn-simpan1' class="btn btn-primary">Simpan</button>
          <button id='btn-simpan2' class="btn btn-primary d-none" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Menyimpan...
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade" id="periodeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="periodeModalLabel">Atur Periode</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="simpanPeriode" method="POST">
        <div class="modal-body">
          <div class="mb-3">
            <label for="" class="form-label">Tahun Ajaran:</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Pilih tahun</option>

            </select>
            <br>
            <label for="" class="form-label">Semester:</label>
            <br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="ganjil" checked>
              <label class="form-check-label" for="inlineRadio1">Ganjil</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="genap">
              <label class="form-check-label" for="inlineRadio2">Genap</label>
            </div>
            <input type="text" class="d-none" id="status" value="Tidak Aktif" name="status" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          <button type="submit" id='btn-simpan1' class="btn btn-primary">Simpan</button>
          <button id='btn-simpan2' class="btn btn-primary d-none" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Menyimpan...
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<script src="assets/extensions/jquery/jquery.min.js"></script>
<script src="assets/extensions/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="assets/extensions/datatables.net-bs5/js/dataTables.bootstrap5.min.js"></script>
<script src="assets/extensions/sweetalert2/sweetalert2.min.js"></script>
<script src="assets/static/js/pages/sweetalert2.js"></script>
<script src="/assets/compiled/js/periode.js"></script>