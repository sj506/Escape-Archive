/* Add new work here. Keep each id stable: project and play URLs use it. */
window.ESCAPE_ARCHIVE = {
  name: 'Escape Archive',
  creator: 'Seungjae',
  description: '익숙한 화면에 숨은 단서를 따라가는 웹탈출 게임을 만듭니다.',
  projects: [
    {
      id: 'graduation-not-complete', number: '02', title: '졸업하지 못한 아이',
      subtitle: '해원고등학교 기록 복원 안내', category: 'horror', genre: '심리 공포',
      status: 'preview', version: '2.0', updated: '2026-09-11', duration: '30–45분', players: '1인',
      cover: './games/graduation-not-complete/assets/school.png', coverMode: 'full',
      coverAlt: '바닷가 마을의 오래된 학교 건물과 비어 있는 운동장',
      premise: '폐교를 앞둔 모교의 홈페이지. 삭제된 학생 한 명과, 20년 전 그날의 기록이 다시 나타난다.',
      intro: ['모교가 폐교된다는 메일이 도착했다. 사라지기 전에 추억을 보관하려고 들어간 홈페이지에는 일곱 명의 동문 추모 기록이 남아 있다.', '그때, 오래전 친구의 계정에서 쪽지가 온다. “읽지 않은 쪽지가 남아 있어.” 지워진 앨범과 소원함, 방송실 기록을 따라 그날의 진실을 복원해 보자.'],
      hook: '이번에는 지우지 마.',
      tags: ['학교 홈페이지', '기록 복원', '선택형 엔딩'],
      features: [{title:'홈페이지를 조사하다',text:'공지사항, 추모관, 앨범과 쪽지함. 익숙한 메뉴에 남은 어긋난 기록을 찾습니다.'},{title:'흩어진 기록을 잇다',text:'댓글로 자리를 추리하고, 소원과 사건을 연결하며 화재 당일의 시간표를 복원합니다.'},{title:'무엇을 남길 것인가',text:'마지막 행동에 따라 세 가지 결말로 이어집니다. 선택하기 전까지 단서를 다시 살펴볼 수 있습니다.'}],
      notes: ['학교폭력, 화재와 사망을 다루는 심리 공포입니다.','타이머가 끝나도 게임은 계속됩니다.','소리 없이 플레이할 수 있습니다.'],
      playPath: './games/graduation-not-complete/index.html',
      download: './downloads/graduation-not-complete-preview.zip', downloadSize: '4.5 MB'
    },
    {
      id: 'missing-0217', number: '01', title: '새벽 2시 17분',
      subtitle: '사라진 사진작가의 마지막 기록', category: 'mystery', genre: '추리 미스터리',
      status: 'preview', version: '2.0', updated: '2026-09-11', duration: '15–25분', players: '1인',
      cover: './games/missing-0217/assets/contact-sheet.png', coverMode: 'triptych-right',
      coverAlt: '한밤중, 시계가 남아 있는 오래된 역 앞 광장',
      premise: '사진작가 한서윤이 사라졌다. 켜진 노트북과 전송되지 않은 메일. 마지막 흔적은 새벽 2시 17분에 멈춰 있다.',
      intro: ['실종 36시간째. 사진작가 한서윤의 노트북은 켜진 채 발견됐다. 메일 세 통과 사진 몇 장, 그리고 잠긴 개인 폴더가 남아 있다.', '평범해 보이는 일상 기록을 교차 확인해 서윤이 남긴 메시지를 읽어내자. 그녀를 찾을 수 있는 장소는 기록 사이에 숨어 있다.'],
      hook: '그녀가 남긴 기록은 아직 지워지지 않았다.',
      tags: ['노트북 탐색', '사진 단서', '암호 추리'],
      features: [{title:'노트북을 열다',text:'메일과 메모를 함께 읽어 개인 폴더의 잠금을 풀고, 복구된 기록을 확인합니다.'},{title:'사진의 순서를 찾다',text:'촬영 장소와 전달 순서를 대조해 사진 세 장이 가리키는 장소를 추리합니다.'},{title:'흔적을 기록하다',text:'단서는 수첩에 자동으로 모입니다. 나만의 추리 메모를 남기며 수사를 이어갈 수 있습니다.'}],
      notes: ['시간제한 없이 조사할 수 있습니다.','손상된 음성 기록은 글로 제공됩니다.','막히면 현재 진행에 맞는 단계별 힌트를 확인하세요.'],
      playPath: './games/missing-0217/index.html',
      download: './downloads/missing-0217-preview.zip', downloadSize: '2.7 MB'
    }
  ]
};
