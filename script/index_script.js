const yh = {
  setAttri : function (target,name,value) {
    target.setAttribute(name,value);
  },
  iT : function (target,string) {
    target.innerText = string;
  },
  labelMaker : function (forId,string,target) {
    const label = document.createElement('label');
    this.setAttri(label,'for',forId);
    this.iT(label,string);
    target.appendChild(label);
  }
}

const root = document.getElementById('root');
let memberList = [];

// 폼 생성 ---------------------------------------
const C_form = document.createElement('form');
yh.setAttri(C_form,'name','teamService')
yh.setAttri(C_form,'action','../Data.txt');
root.appendChild(C_form);
// -----------------------------------------------


// 팀 순번 만들기 ---------------------------------
// select tag생성
yh.labelMaker('teamSel','몇 조 입니까? : ',C_form);
const C_teamSel = document.createElement('select');
yh.setAttri(C_teamSel,'id','teamSel')
yh.setAttri(C_teamSel,'name','teamNum')
C_form.appendChild(C_teamSel);

// select의 option
const teamList = ['1조','2조','3조','4조','5조'];
teamList.forEach(function (Jo) {
  const C_option = document.createElement('option');
  yh.setAttri(C_option,'value',Jo);
  C_option.innerText = Jo;
  C_teamSel.appendChild(C_option);
})
// -----------------------------------------------


// 팀 명 -----------------------------------------
yh.labelMaker('teamName','팀 명 : ',C_form);
const C_teamName = document.createElement('input');
yh.setAttri(C_teamName,'type','text');
yh.setAttri(C_teamName,'id','teamName');
yh.setAttri(C_teamName,'name','teamName');
yh.setAttri(C_teamName,'placeholder',_EXAMDATA.teamInformation.teamName);
C_form.appendChild(C_teamName);
// -----------------------------------------------


// 팀 이름의 탄생 배경 ----------------------------
yh.labelMaker('whyTeamName','팀 명이 정해진 배경에 대해 설명해 주세요 : ',C_form);
const C_whyTeamName = document.createElement('textarea');
yh.setAttri(C_whyTeamName,'id','whyTeamName');
yh.setAttri(C_whyTeamName,'name','whyTeamName');
yh.setAttri(C_whyTeamName,'rows','3');
yh.setAttri(C_whyTeamName,'cols','35');
yh.setAttri(C_whyTeamName,'placeholder',_EXAMDATA.teamInformation.teamNameStory);
C_whyTeamName.style.resize = 'none';
C_form.appendChild(C_whyTeamName)
// -----------------------------------------------


// 소속 멤버 -------------------------------------
// form태그 안에 fieldset 적용 (구역 나누기)
const C_memberfieldset = document.createElement('fieldset');
C_form.appendChild(C_memberfieldset);
const C_memberlegend = document.createElement('legend');
yh.iT(C_memberlegend,'팀 구성원 정보');
C_memberfieldset.appendChild(C_memberlegend);

/*------ 소속 멤버 정보 채우기 ------*/
// 팀원 순번
function teamMemberplus() {
  // wrap div생성
  const memberDatawrap = document.createElement('div');
  C_memberfieldset.appendChild(memberDatawrap)
  // 학번 입력
  yh.labelMaker('memNum','구성원 학번 : ',memberDatawrap);
  let inputNumber;
  // 입력하기 버튼(prompt)
  const C_memNumInputButton = document.createElement('input');
  yh.setAttri(C_memNumInputButton,'type','button');
  yh.setAttri(C_memNumInputButton,'value','입력하기');
  yh.iT(C_memNumInputButton,'학번 입력하기');
  memberDatawrap.appendChild(C_memNumInputButton);
  C_memNumInputButton.addEventListener('click',function () {
    function inprom() {
      inputNumber = Number(prompt('팀 구성원의 학번을 입력해 주십시오'));
      if (isNaN(inputNumber)) { // prompt로 입력 받은 문자열이 숫자인지 아닌지 구분해주는 메서드
        alert('숫자만 입력 가능합니다.');
        inprom();
      } else {
        return inputNumber;
      }
    }
    inprom();
    C_memNumInputButton.remove();
    const p = document.createElement('input');
    yh.setAttri(p,'type','text');
    yh.setAttri(p,'id','memNum');
    yh.setAttri(p,'value',inputNumber);
    p.readOnly = true;
    memberDatawrap.insertBefore(p,memberDatawrap.children[2])
  })
  
  // 구성원 이름
  yh.labelMaker('memName','구성원 이름 : ',memberDatawrap);
  const C_memName = document.createElement('input');
  yh.setAttri(C_memName,'type','text');
  yh.setAttri(C_memName,'name','memName');
  yh.setAttri(C_memName,'id','memName');
  yh.setAttri(C_memName,'placeholder',_EXAMDATA.teamInformation.teamAllMember[0].name);
  memberDatawrap.appendChild(C_memName);
  
  // rank(직급) 설정
  const memRank = ['팀 장','팀 구성원'];
  // rank selector 생성
  yh.labelMaker('memRank','직급(직위) : ',memberDatawrap);
  const C_rank = document.createElement('select');
  yh.setAttri(C_rank,'id','memRank');
  yh.setAttri(C_rank,'name','memRank');
  memberDatawrap.appendChild(C_rank);
  // rank option 설정
  memRank.forEach(function (key) {
    const option = document.createElement('option');
    yh.setAttri(option,'value','key');
    yh.iT(option,key)
    C_rank.appendChild(option);
  })
  
  // GitHub 주소 입력
  yh.labelMaker('memberGitHubURL','깃허브 주소 : ',memberDatawrap);
  const memURL = document.createElement('input');
  yh.setAttri(memURL,'type','url');
  yh.setAttri(memURL,'name','memberGitHubURL');
  yh.setAttri(memURL,'id','memberGitHubURL');
  memberDatawrap.appendChild(memURL);
  
  // 희망 수업 작성
  // 중복선택(checkbox 방식) -----------
  // const hopeClassP = document.createElement('p');
  // hopeClassP.innerText = '구성원이 수강 희망하는 과목 : '
  // memberDatawrap.appendChild(hopeClassP);
  // _EXAMDATA.trainingInformation.subject.forEach(function (key) {
    //   const input = document.createElement('input');
    //   yh.setAttri(input,'type','checkbox');
    //   yh.setAttri(input,'name','hopeClass');
    //   yh.setAttri(input,'id',`hopeClass_${key}`);
    //   memberDatawrap.appendChild(input);
    //   yh.labelMaker(`hopeClass_${key}`,key,memberDatawrap);
    // })
    // ----------------------------------
    
    // 한 가지만 선택(select)
    yh.labelMaker('hopeclass','구성원이 희망하는 과목 : ',memberDatawrap);
    const hopeClass = document.createElement('select');
    yh.setAttri(hopeClass,'name','hopeClass');
    yh.setAttri(hopeClass,'id','hopeClass');
    memberDatawrap.appendChild(hopeClass);
    // select의 option 생성
    _EXAMDATA.trainingInformation.subject.forEach(function (key) {
      const option = document.createElement('option');
      yh.setAttri(option,'value',key);
      yh.iT(option,key);
      hopeClass.appendChild(option);
    })
  
    // 구성원 추가 버튼
    const plusMem = document.createElement('input');
    yh.setAttri(plusMem,'type','button');
    yh.setAttri(plusMem,'value','추가');
    memberDatawrap.appendChild(plusMem);
    plusMem.addEventListener('click',teamMemberplus)
    
    // 구성원 삭제 버튼
    if (memberList.length>0) {
      const minusMem = document.createElement('input')
      yh.setAttri(minusMem,'type','button');
      yh.setAttri(minusMem,'value','삭제');
      memberDatawrap.appendChild(minusMem);
      minusMem.addEventListener('click',deleteMember)
    }

    function deleteMember() {
      if (memberList.length>1) {
        memberList[memberList.length-1].remove();
        memberList.pop();
      } else {
        console.log('삭제끝');
      }
    }
    
    // 몇 번째 구성원?
    memberList.push(memberDatawrap);
    // const memberData = document.getElementsByTagName('fieldset')[0].children[document.getElementsByTagName('fieldset')[0].children.length-1];
    // const countmemberData = document.getElementsByTagName('fieldset')[0].children.length-1
    // memberList.push({countmemberData:memberData});
    // console.log(memberList);
  }
  teamMemberplus();
  const C_submit = document.createElement('input');
  yh.setAttri(C_submit,'type','submit');
  C_form.appendChild(C_submit);
  // -----------------------------------------------

  const formTarget = document.querySelector('#root > form');
  formTarget.onsubmit = function () {
    return false;
  }