const pool = require("../database/index");
const ApiResponse = require("../response");

const masjidController = {
  getAll: async (req, res) => {
    const query = `
      SELECT
        m.id,
        m.nama_masjid,
        m.lokasi,
        m.negara,
        m.tanggal_dibuat,
        s.bagian,
        s.detail,
        f.foto,
        f.url
      FROM masjid m
      LEFT JOIN sejarah_masjid s ON m.id = s.masjid_id
      LEFT JOIN foto_masjid f ON m.id = f.masjid_id;
    `;

    try {
      const [rows, fields] = await pool.query(query);
      const formattedResult = {
        data: rows.reduce((acc, row) => {
          const masjidIndex = acc.findIndex((m) => m.id === row.id);

          if (masjidIndex === -1) {
            acc.push({
              id: row.id,
              nama_masjid: row.nama_masjid,
              lokasi: row.lokasi,
              negara: row.negara,
              tanggal_dibuat: row.tanggal_dibuat,
              sejarah: {
                [row.bagian]: row.detail,
              },
              foto_masjid: {
                [row.foto]: row.url,
              },
            });
          } else {
            acc[masjidIndex].sejarah[row.bagian] = row.detail;
            acc[masjidIndex].foto_masjid[row.foto] = row.url;
          }

          return acc;
        }, []),
      };

      res
        .status(200)
        .json(
          ApiResponse.success(formattedResult, "Data masjid berhasil diambil")
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiResponse.error("Gagal mengambil data masjid"));
    }
  },

  getById: async (req, res) => {
    const masjidId = req.params.id;

    if (isNaN(masjidId)) {
      res.status(400).json(ApiResponse.error("ID masjid harus berupa angka"));
      return;
    }

    const query = `
      SELECT
        m.id,
        m.nama_masjid,
        m.lokasi,
        m.negara,
        m.tanggal_dibuat,
        s.bagian,
        s.detail,
        f.foto,
        f.url
      FROM masjid m
      LEFT JOIN sejarah_masjid s ON m.id = s.masjid_id
      LEFT JOIN foto_masjid f ON m.id = f.masjid_id
      WHERE m.id = ?;
    `;

    try {
      const [rows, fields] = await pool.query(query, [masjidId]);

      if (rows.length === 0) {
        res.status(404).json(ApiResponse.error("Masjid tidak ditemukan"));
        return;
      }

      const formattedResult = {
        data: rows.reduce((acc, row) => {
          acc.id = row.id;
          acc.nama_masjid = row.nama_masjid;
          acc.lokasi = row.lokasi;
          acc.negara = row.negara;
          acc.tanggal_dibuat = row.tanggal_dibuat;

          if (!acc.sejarah) {
            acc.sejarah = {};
          }

          acc.sejarah[row.bagian] = row.detail;

          if (!acc.foto_masjid) {
            acc.foto_masjid = {};
          }

          acc.foto_masjid[row.foto] = row.url;

          return acc;
        }, {}),
      };

      res
        .status(200)
        .json(
          ApiResponse.success(formattedResult, "Data masjid berhasil diambil")
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(ApiResponse.error("Gagal mengambil data masjid"));
    }
  },

  searchByName: async (req, res) => {
    const { q } = req.query;

    if (!q) {
      res
        .status(400)
        .json(ApiResponse.error("Parameter pencarian (q) tidak ditemukan"));
      return;
    }

    const searchQuery = `
      SELECT
        m.id,
        m.nama_masjid,
        m.lokasi,
        m.negara,
        m.tanggal_dibuat,
        s.bagian,
        s.detail,
        f.foto,
        f.url
      FROM masjid m
      LEFT JOIN sejarah_masjid s ON m.id = s.masjid_id
      LEFT JOIN foto_masjid f ON m.id = f.masjid_id
      WHERE m.nama_masjid LIKE ?;
    `;

    try {
      const [rows, fields] = await pool.query(searchQuery, [`%${q}%`]);

      if (rows.length === 0) {
        res.status(404).json(ApiResponse.error("Masjid tidak ditemukan"));
        return;
      }

      const formattedResult = {
        data: rows.reduce((acc, row) => {
          const masjidIndex = acc.findIndex((m) => m.id === row.id);

          if (masjidIndex === -1) {
            acc.push({
              id: row.id,
              nama_masjid: row.nama_masjid,
              lokasi: row.lokasi,
              negara: row.negara,
              tanggal_dibuat: row.tanggal_dibuat,
              sejarah: {
                [row.bagian]: row.detail,
              },
              foto_masjid: {
                [row.foto]: row.url,
              },
            });
          } else {
            acc[masjidIndex].sejarah[row.bagian] = row.detail;
            acc[masjidIndex].foto_masjid[row.foto] = row.url;
          }

          return acc;
        }, []),
      };

      res
        .status(200)
        .json(
          ApiResponse.success(formattedResult, "Data masjid berhasil ditemukan")
        );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(ApiResponse.error("Gagal melakukan pencarian data masjid"));
    }
  },
};

module.exports = masjidController;
