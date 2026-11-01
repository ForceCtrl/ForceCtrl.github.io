# Ctrl-F ICRA supplementary video narration, recovered 2026-10-22

Source: audio track of MARS-8101:~/workspace/ForceCtrl/icra-paper-force/video/final/ctrlf_icra_supplementary_video_clean_teaser_hq.mp4
(= vo_track_v6_norm.wav, narration only, no BGM, 48 kHz mono AAC 143 kbps). Segments cut at the placement
times from build/vo_mix.sh, each ending 0.35 s after the detected end of speech. WAV = straight decode, MP3 = LAME V2.
Original clips lived in ~/Downloads/video-sel/vo(1)/ (names kept below); sections 8 and 9 are the re-takes new_hold.mp3 and no_sonic(1).mp3.

| file | start in video (s) | length (s) |
|---|---|---|
| 01_teaser | 2.5 | 9.89 |
| 02_background | 15.0 | 9.27 |
| 03a_method_stage_1 | 27.0 | 9.90 |
| 03b_method_mechanism | 38.5 | 8.67 |
| 03c_method_stage_2 | 49.5 | 7.56 |
| 04_force_realized | 59.5 | 5.65 |
| 04.5_tasks_card | 68.5 | 2.64 |
| 05_drag_crate | 72.5 | 5.50 |
| 06_push_box | 78.5 | 4.50 |
| 07_raise_box | 83.5 | 6.49 |
| 08_hold_on_a_rope__new_hold | 92.5 | 4.34 |
| 09_stand_kick__no_sonic | 99.5 | 5.66 |
| 10_sweep_kick | 107.5 | 4.59 |
| 10.5_adaptation_card | 112.5 | 3.26 |
| 11_drag_load_added | 116.0 | 7.85 |
| 12_rope_1_1_kg | 125.5 | 6.71 |
| 13_closing | 136.5 | 8.75 |

## Lines added 2026-11-01 (synthetic)

The three lines written for the web film, generated with Chatterbox (open-source TTS, MIT) cloning this narration's
voice from `05_drag_crate.wav` (exaggeration 0.4, cfg 0.5, seed 2), loudness-matched to the narration (-17.2 LUFS),
48 kHz. Chatterbox embeds an inaudible Perth watermark.
Chatterbox outputs 24 kHz and sounded duller than the recordings, so the lines were then brightened to match them
(`_work/tts/brighten.py`: two exciter stages above 7 and 9 kHz, then an FIR matching the recordings' average
spectrum; every band within ~2 dB). Chatterbox also spoke 14 and 15 about 12% slower than the recordings and barely paused at commas, so `_work/tts/pace.py` speeds them up (WSOLA time stretch, pitch and timbre kept) and sets the comma pauses to 0.15-0.3 s before brightening. The unprocessed versions are in `synthetic_unprocessed/`. Scripts and the other takes: `_work/tts/`.

| file | text | length (s) |
|---|---|---|
| 14_sim_tasks | In simulation, we train high-level policies for nine tasks, using the hands, the feet, or both. | 5.90 |
| 15_mass_change | They also adapt when the object's mass changes during the task. | 3.70 |
| 16_real_tasks | Now on the real robot, under different loads. | 2.70 |
