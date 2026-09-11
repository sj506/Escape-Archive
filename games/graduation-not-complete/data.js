const people=[
 {name:'김민재',year:'2011.07.26',act:'물을 끼얹고 화장실에 가뒀다',wish:'그날 일을 모두가 잊게 해주세요.',death:'폭우로 침수된 지하주차장에서 발견',answer:'flood',fragment:'나는 보았고'},
 {name:'박소연',year:'2013.10.17',act:'가영의 일기장을 빼앗아 불태웠다',wish:'증거가 전부 사라지게 해주세요.',death:'작업실 화재로 사망',answer:'fire',fragment:'나는 들었고'},
 {name:'이도윤',year:'2015.02.04',act:'청소도구함에 가영을 가뒀다',wish:'아무도 그 문을 열지 못하게 해주세요.',death:'고장 난 승강기에 갇힌 채 발견',answer:'elevator',fragment:'나는 알았지만'},
 {name:'최유라',year:'2017.06.11',act:'가영을 계단에서 밀었다',wish:'학교에서 처벌받지 않게 해주세요.',death:'계단 추락 사고로 사망',answer:'fall',fragment:'문을 열지 않았고'},
 {name:'정하린',year:'2020.10.17',act:'가영이 거짓말을 한다는 소문을 퍼뜨렸다',wish:'아무도 가영의 말을 믿지 않게 해주세요.',death:'구조 요청이 장난으로 오인된 뒤 사망',answer:'ignored',fragment:'선생님을 부르지 않았고'},
 {name:'오준호',year:'2023.03.08',act:'신발을 숨기고 맨발로 운동장을 뛰게 했다',wish:'누구보다 빨라지게 해주세요.',death:'도망치던 중 도로에서 사고',answer:'road',fragment:'쪽지를 읽었고'},
 {name:'서태훈',year:'2026.10.16',act:'괴롭힘을 주도하고 가영을 방송실에 가뒀다',wish:'윤가영이 학교에서 영원히 사라지게 해주세요.',death:'폐교 지하 방송실에서 발견',answer:'broadcast',fragment:'그것을 지웠다'}
];

const deathOptions=[['','대가를 선택하세요'],['elevator','고장 난 승강기'],['road','도주 중 교통사고'],['fire','작업실 화재'],['broadcast','폐교 방송실'],['flood','침수된 지하공간'],['ignored','무시된 구조 요청'],['fall','계단 추락']];
const timeline=[
 {id:'lure',time:'18:20',source:'서태훈의 발신 기록',text:'시험지 사진을 돌려주겠다며 가영을 구관 방송실로 부름'},
 {id:'lock',time:'18:34',source:'출입 통제 장치 기록',text:'카메라를 빼앗고 방송실 문을 밖에서 잠금'},
 {id:'spark',time:'18:41',source:'방송 장비 오류 기록',text:'파손된 장비의 낡은 배선에서 불꽃 발생'},
 {id:'escape',time:'18:43',source:'구관 복도 CCTV 목록',text:'연기를 본 일곱 명이 복도를 따라 도망침'},
 {id:'message',time:'18:47',source:'쪽지 전송 서버 기록',text:'가영이 첫 구조 요청을 보냄'},
 {id:'read',time:'18:49',source:'수신 확인 기록',text:'수신 계정에서 구조 요청을 읽음'},
 {id:'deny',time:'18:50',source:'서태훈의 메신저 기록',text:'서태훈이 수신자에게 장난이니 무시하라고 말함'},
 {id:'deleted',time:'18:51',source:'휴지통 작업 기록',text:'수신 계정에서 구조 요청을 삭제'},
 {id:'last',time:'18:56',source:'쪽지 전송 서버 기록',text:'가영이 마지막 쪽지를 보냄'},
 {id:'alarm',time:'19:08',source:'경비실 화재경보 일지',text:'화재경보가 뒤늦게 작동'},
 {id:'found',time:'19:23',source:'현장 수습 기록',text:'방송실 안에서 가영이 발견됨'}
];
