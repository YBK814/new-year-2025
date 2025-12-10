const svg = document.getElementById("svg");
const svgNS = "http://www.w3.org/2000/svg";


// BGM 플레이어 초기화
const bgmPlayer = document.getElementById("bgmPlayer");
// BGM 소스 URL 설정 (HLS 스트리밍 또는 일반 오디오 파일)
// 예시: const bgmSource = 'https://example.com/bgm.m3u8'; 또는 'audio/bgm.mp3'
const bgmSource = 'https://japaneast.av.mk.io/dupluscdn-duranno-mkio/473f1c33-2eb9-4bac-af37-5b4301946a45/87b781eb-5dcc-4604-b842-3063e0af.ism/manifest(format=m3u8-cmaf)'; // BGM 파일 경로를 여기에 설정하세요

// BGM 초기화 함수
function initBGM() {
  if (!bgmPlayer || !bgmSource) return;
  
  // 볼륨 설정 (제공된 코드 참고: video.volume = 0.3)
  bgmPlayer.volume = 0.3;
  
  // HLS.js를 사용한 BGM 재생 (HLS 스트리밍인 경우)
  if (Hls.isSupported() && bgmSource.includes('.m3u8')) {
    const hls = new Hls();
    hls.loadSource(bgmSource);
    hls.attachMedia(bgmPlayer);
    
    // 에러 처리
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error('BGM HLS 에러:', data);
      }
    });
  } else if (bgmPlayer.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 등 네이티브 HLS 지원 브라우저
    bgmPlayer.src = bgmSource;
  } else if (!bgmSource.includes('.m3u8')) {
    // 일반 오디오 파일 (mp3, m4a 등)
    bgmPlayer.src = bgmSource;
  } else {
    console.error('BGM 재생을 지원하지 않는 브라우저입니다.');
  }
}

// BGM 재생 함수
function playBGM() {
  if (!bgmPlayer || !bgmSource) return;
  
  bgmPlayer.play().catch(error => {
    console.error('BGM 재생 실패:', error);
  });
}