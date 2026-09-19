// Beginner-oriented form cues per exercise slug (see exerciseIcons.jsx for the
// name -> slug map). Kept deliberately generic and conservative: three short
// points on setup, movement and the most common mistake. ja is used for
// ja/ko/zh and en for en/es, matching how exercise names are localized.
export const FORM_TIPS = {
  'bench-press': {
    ja: { muscle: '胸・三頭・肩前部', points: ['肩甲骨を寄せて胸を張り、足は床にしっかり踏む', 'バーは乳首のあたりまで下ろし、肘は体から45度ほど開く', 'お尻を浮かせず、手首を立てたまま押し上げる'] },
    en: { muscle: 'Chest, triceps, front delts', points: ['Pull shoulder blades together, chest up, feet planted', 'Lower the bar to mid-chest with elbows about 45° from the body', 'Keep hips down and wrists stacked over elbows as you press'] },
  },
  'dumbbell-bench-press': {
    ja: { muscle: '胸・三頭・肩前部', points: ['肩甲骨を寄せて胸を張った姿勢をキープ', 'ダンベルは胸の横までゆっくり下ろし、深く下げすぎない', '押し上げたとき肘を伸ばし切らず、胸に力を残す'] },
    en: { muscle: 'Chest, triceps, front delts', points: ['Keep shoulder blades pinched and chest up', 'Lower slowly to chest level without over-stretching', 'Stop just short of locking the elbows to keep tension on the chest'] },
  },
  'push-up': {
    ja: { muscle: '胸・三頭・肩前部', points: ['頭からかかとまで一直線。腰を反らせたり落としたりしない', '肘は体から45度ほど。真横に開きすぎない', '胸が床に近づくまでしっかり下げる'] },
    en: { muscle: 'Chest, triceps, front delts', points: ['Keep a straight line from head to heels; no sagging hips', 'Elbows about 45° from the body, not flared out', 'Lower until the chest is close to the floor'] },
  },
  'incline-bench-press': {
    ja: { muscle: '胸の上部・肩前部・三頭', points: ['ベンチの角度は30度前後。急すぎると肩の種目になる', '鎖骨のあたりまでバーを下ろす', '肩をすくめず、肩甲骨を寄せたまま押す'] },
    en: { muscle: 'Upper chest, front delts, triceps', points: ['Set the bench around 30°; steeper shifts work to the shoulders', 'Lower the bar toward the upper chest', 'Keep shoulder blades pinched and shoulders down'] },
  },
  'dumbbell-fly': {
    ja: { muscle: '胸', points: ['肘を軽く曲げたまま固定し、大きな弧を描くように開く', '胸が伸びるところまでで止める。下げすぎは肩に負担', '軽めの重量で、胸を寄せる意識で閉じる'] },
    en: { muscle: 'Chest', points: ['Keep a slight bend in the elbows and open in a wide arc', 'Stop when the chest is stretched; going deeper stresses the shoulders', 'Use light weight and squeeze the chest as you close'] },
  },
  'machine-chest-press': {
    ja: { muscle: '胸・三頭', points: ['グリップが胸の高さに来るようシートを調整', '背中をパッドにつけ、肩をすくめない', '戻すときも重りを完全に抜かず、ゆっくりコントロール'] },
    en: { muscle: 'Chest, triceps', points: ['Adjust the seat so the handles line up with mid-chest', 'Keep your back on the pad and shoulders down', 'Control the return; do not let the weight stack drop'] },
  },
  'dip': {
    ja: { muscle: '胸下部・三頭', points: ['体をやや前傾させると胸、直立に近いと三頭に効く', '肩がすくまないよう、肘が90度くらいまで下げる', '反動を使わず、ゆっくり上げ下げする'] },
    en: { muscle: 'Lower chest, triceps', points: ['Lean forward to hit the chest, stay upright for triceps', 'Lower to about 90° at the elbows without shrugging', 'Move slowly; avoid bouncing at the bottom'] },
  },
  'pull-up': {
    ja: { muscle: '広背筋・二頭', points: ['肩を下げて胸を張り、ぶら下がるだけにしない', '胸をバーに近づけるイメージで肘を下に引く', '下ろすときもゆっくり。反動は使わない'] },
    en: { muscle: 'Lats, biceps', points: ['Depress the shoulders and lift the chest before pulling', 'Drive elbows down as if bringing chest to the bar', 'Lower slowly; avoid swinging'] },
  },
  'lat-pulldown': {
    ja: { muscle: '広背筋・二頭', points: ['少し胸を張り、バーを鎖骨のあたりまで引く', '肘を体の横に下げる意識で。腕だけで引かない', '戻すときは肩が持ち上がるまでしっかり伸ばす'] },
    en: { muscle: 'Lats, biceps', points: ['Lean back slightly and pull the bar to the collarbone', 'Think elbows down and back, not just arms', 'Let the arms extend fully on the way up'] },
  },
  'one-arm-dumbbell-row': {
    ja: { muscle: '広背筋・僧帽筋・二頭', points: ['ベンチに手と膝をつき、背中はまっすぐ床と平行に', 'ダンベルは腰に向かって、肘を後ろに引く', '体をひねらず、背中の筋肉で引く'] },
    en: { muscle: 'Lats, upper back, biceps', points: ['Support on a bench with a flat back parallel to the floor', 'Pull the dumbbell toward your hip, driving the elbow back', 'Do not twist the torso; pull with the back'] },
  },
  'deadlift': {
    ja: { muscle: '背中・お尻・もも裏', points: ['バーは体のすぐ近く。背中は丸めず、胸を張る', '足で床を押す意識で立ち上がり、腰だけで引かない', '最後はお尻を締めて直立。反り返らない'] },
    en: { muscle: 'Back, glutes, hamstrings', points: ['Keep the bar close, back flat, chest up', 'Push the floor away with your legs; do not just pull with the lower back', 'Finish standing tall with glutes squeezed; do not lean back'] },
  },
  'dumbbell-bent-over-row': {
    ja: { muscle: '背中全体・二頭', points: ['股関節から前傾し、背中はまっすぐキープ', 'ダンベルをみぞおちのほうへ、肘を後ろに引く', '上体を起こしたり反動を使ったりしない'] },
    en: { muscle: 'Upper and mid back, biceps', points: ['Hinge at the hips with a flat back', 'Row toward the lower ribs, elbows driving back', 'Do not stand up or use momentum'] },
  },
  'seated-row': {
    ja: { muscle: '背中中部・広背筋', points: ['背筋を伸ばして座り、胸を張る', 'ハンドルをお腹に向けて引き、肩甲骨を寄せる', '戻すときに背中を丸めない'] },
    en: { muscle: 'Mid back, lats', points: ['Sit tall with the chest up', 'Pull the handle to the abdomen and squeeze the shoulder blades', 'Do not round the back on the return'] },
  },
  'seated-dumbbell-press': {
    ja: { muscle: '肩・三頭', points: ['背もたれに背中をつけ、腰を反らせすぎない', 'ダンベルは耳の横から真上へ押し上げる', '肩をすくめず、下ろすときも耳の高さまでゆっくり'] },
    en: { muscle: 'Shoulders, triceps', points: ['Keep your back on the pad without over-arching', 'Press straight up from ear level', 'Keep shoulders down and lower with control'] },
  },
  'lateral-raise': {
    ja: { muscle: '肩の側面', points: ['肘を軽く曲げ、肩の高さまで横に上げる', '小指側を少し高くするイメージで、反動は使わない', '肩をすくめず、軽めの重量でゆっくり'] },
    en: { muscle: 'Side delts', points: ['Slight elbow bend; raise to shoulder height', 'Lead with the elbows and avoid swinging', 'Keep shoulders down and use light weight'] },
  },
  'front-raise': {
    ja: { muscle: '肩の前部', points: ['体を反らさず、肩の高さまでまっすぐ前に上げる', '肘は軽く曲げたまま固定', '下ろすときもゆっくり。反動は使わない'] },
    en: { muscle: 'Front delts', points: ['Raise straight forward to shoulder height without leaning back', 'Keep a soft bend in the elbows', 'Lower slowly; no swinging'] },
  },
  'overhead-press': {
    ja: { muscle: '肩・三頭・体幹', points: ['お腹とお尻に力を入れ、腰を反らさない', 'バーは顔の前を通し、頭の真上で止める', '押し切ったとき肩をすくめて耳に近づける'] },
    en: { muscle: 'Shoulders, triceps, core', points: ['Brace abs and glutes; do not over-arch the lower back', 'Bar path passes close to the face, finishing over the head', 'Shrug up at the top to lock out'] },
  },
  'face-pull': {
    ja: { muscle: '肩の後部・僧帽筋', points: ['ロープを顔の高さに向けて引く', '肘を高く保ち、肩甲骨を寄せる', '軽めの重量で、反動を使わない'] },
    en: { muscle: 'Rear delts, upper back', points: ['Pull the rope toward face height', 'Keep elbows high and squeeze the shoulder blades', 'Use light weight, no swinging'] },
  },
  'arnold-press': {
    ja: { muscle: '肩全体', points: ['手のひらを顔に向けた位置から始める', '押し上げながら外側へ回転させる', '腰を反らさず、ゆっくり回して戻す'] },
    en: { muscle: 'All three shoulder heads', points: ['Start with palms facing you at chest height', 'Rotate outward as you press up', 'Keep the back neutral and reverse slowly'] },
  },
  'bicep-curl': {
    ja: { muscle: '上腕二頭筋', points: ['肘を体の横に固定し、前後に動かさない', '体を反らさず、肘から先だけで持ち上げる', '下ろすときもゆっくり。完全に伸ばし切る'] },
    en: { muscle: 'Biceps', points: ['Pin the elbows to your sides', 'Do not lean back; only the forearms move', 'Lower slowly to a full stretch'] },
  },
  'tricep-pushdown': {
    ja: { muscle: '上腕三頭筋', points: ['肘を体の横に固定して動かさない', '下まで押し切って三頭を絞る', '戻すときは肘が90度くらいまでで止める'] },
    en: { muscle: 'Triceps', points: ['Keep elbows fixed at your sides', 'Press all the way down and squeeze', 'Return only to about 90° at the elbow'] },
  },
  'overhead-tricep-extension': {
    ja: { muscle: '上腕三頭筋', points: ['肘は頭の横で前に向け、開きすぎない', '肘の位置は動かさず、肘から先だけ伸ばす', '腰を反らさず、お腹に力を入れる'] },
    en: { muscle: 'Triceps', points: ['Elbows pointing forward beside the head', 'Only the forearms move; keep the elbows still', 'Brace the abs; do not arch the back'] },
  },
  'hammer-curl': {
    ja: { muscle: '上腕二頭筋・腕橈骨筋', points: ['手のひらを向かい合わせにしたまま持ち上げる', '肘を体の横に固定', '反動を使わず、ゆっくり下ろす'] },
    en: { muscle: 'Biceps, brachioradialis', points: ['Keep palms facing each other throughout', 'Pin elbows at your sides', 'Lower slowly; no swinging'] },
  },
  'preacher-curl': {
    ja: { muscle: '上腕二頭筋', points: ['腕の裏側をパッドにしっかりつける', '下ろすときも伸ばし切りすぎず、ゆっくり', '肩をすくめず、二頭に集中'] },
    en: { muscle: 'Biceps', points: ['Keep the backs of the upper arms flat on the pad', 'Lower slowly without snapping the elbows straight', 'Keep shoulders down and focus on the biceps'] },
  },
  'skull-crusher': {
    ja: { muscle: '上腕三頭筋', points: ['肘は天井に向けて固定し、動かさない', 'バーは額のすぐ後ろへゆっくり下ろす', '重すぎると肘を痛めやすいので軽めから'] },
    en: { muscle: 'Triceps', points: ['Keep elbows pointing to the ceiling and still', 'Lower the bar just behind the forehead slowly', 'Start light; heavy loads can strain the elbows'] },
  },
  'squat': {
    ja: { muscle: '太もも・お尻', points: ['足は肩幅、つま先はやや外向き。膝はつま先と同じ方向へ', '背中は丸めず、お尻を後ろに引くように下げる', '太ももが床と平行になるまで。かかとは浮かせない'] },
    en: { muscle: 'Quads, glutes', points: ['Feet shoulder-width, toes slightly out; knees track over toes', 'Keep the back flat and sit the hips back', 'Go to parallel with heels down'] },
  },
  'leg-press': {
    ja: { muscle: '太もも・お尻', points: ['腰をシートにつけたまま、お尻を浮かせない', '膝が内側に入らないよう、つま先と同じ向きに', '膝は伸ばし切らず、少し曲げた位置で止める'] },
    en: { muscle: 'Quads, glutes', points: ['Keep hips on the seat; do not let them lift', 'Knees track in line with the toes', 'Stop just short of locking the knees'] },
  },
  'leg-curl': {
    ja: { muscle: 'もも裏', points: ['腰を浮かせず、パッドの位置をかかと寄りに調整', 'ゆっくり曲げてもも裏を絞る', '戻すときも重りを止めずコントロール'] },
    en: { muscle: 'Hamstrings', points: ['Keep hips down and set the pad just above the heels', 'Curl slowly and squeeze the hamstrings', 'Control the return'] },
  },
  'leg-extension': {
    ja: { muscle: '太もも前', points: ['膝の位置とマシンの回転軸を合わせる', '足首のパッドはすねの下のほう', '伸ばし切ったところで少し止め、ゆっくり戻す'] },
    en: { muscle: 'Quads', points: ['Align the knee with the machine axis', 'Set the ankle pad low on the shin', 'Pause at the top and lower slowly'] },
  },
  'walking-lunge': {
    ja: { muscle: '太もも・お尻', points: ['大きめの一歩で、背筋を伸ばしたまま', '前の膝がつま先より大きく前に出ないように', '後ろの膝を床すれすれまで下ろす'] },
    en: { muscle: 'Quads, glutes', points: ['Take a long step and stay upright', 'Front knee should not travel far past the toes', 'Lower the back knee close to the floor'] },
  },
  'bulgarian-split-squat': {
    ja: { muscle: '太もも・お尻', points: ['後ろ足をベンチに乗せ、前足は遠めに置く', '上体はまっすぐ、まっすぐ下に沈む', '前足のかかとで床を押して立ち上がる'] },
    en: { muscle: 'Quads, glutes', points: ['Rear foot on the bench, front foot set well forward', 'Torso upright; sink straight down', 'Drive through the front heel to stand'] },
  },
  'calf-raise': {
    ja: { muscle: 'ふくらはぎ', points: ['つま先立ちで最大まで上げ、1秒止める', 'かかとはゆっくり下まで下ろして伸ばす', '膝は軽く伸ばしたまま、反動は使わない'] },
    en: { muscle: 'Calves', points: ['Rise as high as possible and pause for a second', 'Lower the heels slowly for a full stretch', 'Keep knees nearly straight and avoid bouncing'] },
  },
  'crunch': {
    ja: { muscle: '腹直筋', points: ['腰は床につけたまま、おへそを覗き込むように上体を丸める', '首を引っ張らず、目線は斜め上', '上げるとき息を吐き、お腹を縮める'] },
    en: { muscle: 'Abs', points: ['Keep the lower back on the floor and curl toward the navel', 'Do not pull on the neck; eyes look up and forward', 'Exhale as you crunch'] },
  },
  'plank': {
    ja: { muscle: '体幹', points: ['肘は肩の真下。頭からかかとまで一直線', 'お尻が上がったり腰が落ちたりしないように', '呼吸を止めず、お腹に力を入れ続ける'] },
    en: { muscle: 'Core', points: ['Elbows under shoulders; straight line from head to heels', 'Do not let the hips pike or sag', 'Keep breathing and brace the abs'] },
  },
  'lying-leg-raise': {
    ja: { muscle: '下腹部', points: ['腰を床から浮かせないよう、手をお尻の下に置いてもよい', '脚はまっすぐ、ゆっくり上げて下ろす', '床につく直前で止めて、腹筋の力を抜かない'] },
    en: { muscle: 'Lower abs', points: ['Keep the lower back pressed down; hands under hips if needed', 'Raise and lower the straight legs slowly', 'Stop just above the floor to keep tension'] },
  },
  'ab-wheel': {
    ja: { muscle: '腹筋・体幹', points: ['膝つきから、腰が反らないよう背中を軽く丸める', '動かせる範囲までで十分。無理に伸ばしすぎない', '戻すときはお腹で引き寄せる'] },
    en: { muscle: 'Abs, core', points: ['Start from the knees with a slightly rounded back', 'Only roll as far as you can control', 'Pull back using the abs'] },
  },
  'dumbbell-side-bend': {
    ja: { muscle: '腹斜筋', points: ['まっすぐ立ち、真横に倒す(前後に傾けない)', '反動を使わず、脇腹で持ち上げる', '重すぎるとやりにくいので軽めから'] },
    en: { muscle: 'Obliques', points: ['Stand tall and bend straight sideways, not forward or back', 'Lift with the side abs, no momentum', 'Start light'] },
  },
}
