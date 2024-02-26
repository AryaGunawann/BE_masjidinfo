const pool = require("../database/index");
const ApiResponse = require("../response");

// Function to handle common logic for building result structure
function buildResultStructure(acc, row) {
  const masjidIndex = acc.findIndex((m) => m.id === row.id);

  if (masjidIndex === -1) {
    acc.push({
      id: row.id,
      nama_masjid: row.nama_masjid,
      lokasi: row.lokasi,
      negara: row.negara,
      tanggal_dibuat: row.tanggal_dibuat,
      sejarah: [
        {
          bagian: row.bagian,
          keterangan: row.sejarah,
          fotoUrl: row.foto_sejarah,
        },
      ],
      foto_masjid: row.foto_masjid
        ? [{ url: row.foto_masjid, keterangan: row.keterangan_foto }]
        : [],
    });
  } else {
    // If sejarah for the specific bagian already exists, don't update it
    const existingSejarah = acc[masjidIndex].sejarah.find(
      (s) => s.bagian === row.bagian
    );

    if (!existingSejarah) {
      // If sejarah doesn't exist, add it at the end of the array
      acc[masjidIndex].sejarah.push({
        bagian: row.bagian,
        keterangan: row.sejarah,
        fotoUrl: row.foto_sejarah,
      });
    }
    
    // Sort sejarah array based on bagian
    acc[masjidIndex].sejarah.sort((a, b) => {
      const bagianA = a.bagian.toLowerCase();
      const bagianB = b.bagian.toLowerCase();
      return bagianA.localeCompare(bagianB);
    });

    const fotoMasjidIndex = acc[masjidIndex].foto_masjid.findIndex(
      (f) => f.url === row.foto_masjid
    );

    if (fotoMasjidIndex === -1) {
      acc[masjidIndex].foto_masjid.push({
        url: row.foto_masjid,
        keterangan: row.keterangan_foto,
      });
    }
  }

  return acc;
}

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
        s.keterangan AS sejarah,
        s.foto_url AS foto_sejarah,
        f.foto_url AS foto_masjid,
        f.keterangan AS keterangan_foto
      FROM masjid m
      LEFT JOIN sejarah_masjid s ON m.id = s.masjid_id
      LEFT JOIN foto_masjid f ON m.id = f.masjid_id;
    `;

    try {
      const [rows, fields] = await pool.query(query);
      const formattedResult = {
        data: rows.reduce(buildResultStructure, []),
      };

      formattedResult.data.forEach((masjid) => {
        masjid.sejarah.sort((a, b) => b.bagian - a.bagian);
      });

      res
        .status(200)
        .json(
          ApiResponse.success(formattedResult, "Data masjid berhasil diambil")
        );
    } catch (error) {
      console.error("Error in getAll:", error);
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
        s.keterangan AS sejarah,
        s.foto_url AS foto_sejarah,
        f.foto_url AS foto_masjid,
        f.keterangan AS keterangan_foto
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
        id: rows[0].id,
        nama_masjid: rows[0].nama_masjid,
        lokasi: rows[0].lokasi,
        negara: rows[0].negara,
        tanggal_dibuat: rows[0].tanggal_dibuat,
        sejarah: rows.map((row) => ({
          bagian: row.bagian,
          keterangan: row.sejarah,
          fotoUrl: row.foto_sejarah,
        })),
        foto_masjid: rows[0].foto_masjid
          ? [{ url: rows[0].foto_masjid, keterangan: rows[0].keterangan_foto }]
          : [],
      };

      formattedResult.sejarah.sort(
        (a, b) => new Date(b.tanggal_dibuat) - new Date(a.tanggal_dibuat)
      );

      res
        .status(200)
        .json(
          ApiResponse.success(formattedResult, "Data masjid berhasil diambil")
        );
    } catch (error) {
      console.error("Error in getById:", error);
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
        s.keterangan AS sejarah,
        s.foto_url AS foto_sejarah,
        f.foto_url AS foto_masjid,
        f.keterangan AS keterangan_foto
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
        status: "success",
        data: rows.reduce(buildResultStructure, []),
      };

      res
        .status(200)
        .json(
          ApiResponse.success(formattedResult, "Data masjid berhasil ditemukan")
        );
    } catch (error) {
      console.error("Error in searchByName:", error);
      res
        .status(500)
        .json(ApiResponse.error("Gagal melakukan pencarian data masjid"));
    }
  },
};

module.exports = masjidController;
