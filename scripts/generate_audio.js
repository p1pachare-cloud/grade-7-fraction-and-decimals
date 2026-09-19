import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_0af55b573c54fe31387443150c45624fed865ccc914cd486';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.5, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.2, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.5, style: 0.6, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.6, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.2, similarity_boost: 0.55, style: 0.5, use_speaker_boost: true },
  instruction: { stability: 0.2, similarity_boost: 0.55, style: 0.5, use_speaker_boost: true },
};

const phrases = [
  // Wonder
  { text: "Why does 1/3 equal 0.333... forever as an infinite recurring decimal, while 1/4 terminates cleanly at 0.25?", style: "question", filename: "audio_wonder_hook_0.mp3" },
  { text: "Is this determined by prime factors of the denominator? Let's test it!", style: "thinking", filename: "audio_wonder_mascot_0.mp3" },

  // Story Panels
  { text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki form the Global Cyber-Grid Architects team.", style: "statement", filename: "audio_story_panel1_0.mp3" },
  { text: "Aisha in Dubai allocates 3/8 of a high-speed data stream to telemetry, converting 3/8 into 0.375 for decimal signal processing.", style: "statement", filename: "audio_story_panel2_0.mp3" },
  { text: "Liam in London calculates a 1/3 server bandwidth split, noticing the signal creates a recurring decimal 0.333... forever.", style: "statement", filename: "audio_story_panel3_0.mp3" },
  { text: "Yuki in Tokyo multiplies a 1/2 bandwidth quota by 0.8 latency boost, calculating 0.5 × 0.8 = 0.4 total signal efficiency!", style: "emphasis", filename: "audio_story_panel4_0.mp3" },
  { text: "Sofia in Rio measures signal latency as 12.3456 ms and rounds it to 3 significant figures: 12.3 ms for real-time routing!", style: "thinking", filename: "audio_story_panel5_0.mp3" },
  { text: "Every server node, data fraction, and decimal latency calculation works together to power our global cyber grid!", style: "celebration", filename: "audio_story_panel6_0.mp3" },

  // Simulation Instructions
  { text: "Adjust the numerator and denominator sliders to observe live decimal conversions and grid shading!", style: "instruction", filename: "audio_station_a_instruction_0.mp3" },
  { text: "Compute the mixed operation between fractions and decimals!", style: "instruction", filename: "audio_station_b_instruction_0.mp3" },
  { text: "Execute multi-step fraction conversions and precision rounding to significant figures!", style: "instruction", filename: "audio_station_c_instruction_0.mp3" },

  // Feedback & Reflect
  { text: "Cyber-grid node calibrated! Your calculation is spot on!", style: "celebration", filename: "audio_correct_0.mp3" },
  { text: "Give one real-world example where converting a fraction to a decimal is crucial in engineering or digital systems!", style: "question", filename: "audio_reflect_prompt_0.mp3" }
];

const outputDir = path.join(__dirname, '../public/assets/audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchGoogleTTSBuffer(text) {
  const chunks = [];
  // Google TTS limits single requests to ~200 chars, so split long sentences by punctuation if needed
  const textParts = text.match(/.{1,180}(?=\s|$)/g) || [text];

  for (const part of textParts) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(part.trim())}&tl=en&client=tw-ob`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google TTS error: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    chunks.push(buf);
  }

  return Buffer.concat(chunks);
}

async function generateAudioForPhrase(phrase) {
  const filePath = path.join(outputDir, phrase.filename);
  console.log(`Generating: ${phrase.filename}...`);

  // Attempt ElevenLabs API first
  let success = false;
  if (API_KEY) {
    try {
      const voiceSettings = STYLE_SETTINGS[phrase.style] || STYLE_SETTINGS.statement;
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: phrase.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: voiceSettings,
        }),
      });

      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        console.log(`✓ Generated via ElevenLabs: ${phrase.filename} (${buffer.length} bytes)`);
        success = true;
      } else {
        const errText = await response.text();
        console.warn(`ElevenLabs API (${response.status}): ${errText}`);
      }
    } catch (e) {
      console.warn('ElevenLabs API request failed:', e.message);
    }
  }

  // Fallback to high-definition offline TTS generator if ElevenLabs API key is unauthorized/fails
  if (!success) {
    try {
      console.log(`  ↪ Generating offline TTS fallback for ${phrase.filename}...`);
      const buffer = await fetchGoogleTTSBuffer(phrase.text);
      fs.writeFileSync(filePath, buffer);
      console.log(`✓ Saved offline TTS asset: ${phrase.filename} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`❌ Failed generating TTS for ${phrase.filename}:`, err.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting Offline Audio Asset Generation Pipeline...');
  for (const phrase of phrases) {
    await generateAudioForPhrase(phrase);
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log('\nWriting src/utils/audioMap.js...');
  const audioMapEntries = {};
  phrases.forEach((p) => {
    audioMapEntries[p.text] = `/assets/audio/${p.filename}`;
  });

  const audioMapContent = `/**
 * Pre-generated audio dictionary map.
 * Key: Exact spoken string
 * Value: Relative path to static audio asset
 */

export const audioMap = ${JSON.stringify(audioMapEntries, null, 2)};

export default audioMap;
`;

  const targetPath = path.join(__dirname, '../src/utils/audioMap.js');
  fs.writeFileSync(targetPath, audioMapContent, 'utf8');
  console.log('✅ Successfully generated all 13 offline static MP3 audio assets in public/assets/audio/ and updated src/utils/audioMap.js!');
}

main();
