// hls-server.js

const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Your IPTV .ts stream URL
const IPTV_STREAM_URL =
  "http://line.trx-ott.com:80/df112a0496/27caefcbcc3a/646977";

// HLS output directory
const HLS_OUTPUT_DIR = path.join(__dirname, "public", "hls");

// Create output folder if not exist
if (!fs.existsSync(HLS_OUTPUT_DIR)) {
  fs.mkdirSync(HLS_OUTPUT_DIR, { recursive: true });
}

// Clear existing HLS files
fs.readdirSync(HLS_OUTPUT_DIR).forEach((file) =>
  fs.unlinkSync(path.join(HLS_OUTPUT_DIR, file))
);

const app = express();
app.use(cors());
app.use("/hls", express.static(HLS_OUTPUT_DIR));

// Start ffmpeg process
console.log("Starting ffmpeg live transcoding...");

const ffmpeg = spawn("ffmpeg", [
  "-i",
  IPTV_STREAM_URL,
  "-c:v",
  "copy",
  "-c:a",
  "copy",
  "-f",
  "hls",
  "-hls_time",
  "6", // 6 seconds per segment
  "-hls_list_size",
  "5", // Number of segments to keep
  "-hls_flags",
  "delete_segments", // Remove old segments
  path.join(HLS_OUTPUT_DIR, "playlist.m3u8"),
]);

ffmpeg.stderr.on("data", (data) => {
  console.error(`FFmpeg error: ${data}`);
});

ffmpeg.on("exit", (code) => {
  console.log(`FFmpeg exited with code ${code}`);
});

// Start express server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `HLS server running at http://localhost:${PORT}/hls/playlist.m3u8`
  );
});
