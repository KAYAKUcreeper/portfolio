const SKILLS = ['TypeScript', 'React', 'Three.js', 'Node.js']

export function ProfileSection() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-sao-white/90">
      <div>
        <p className="font-display text-base text-sao-cyan">Player Name</p>
        <p className="text-sao-white/60">吉田伊吹/KAYAKUcreeper</p>
      </div>
      <p>
        こんにちは<br></br>
        吉田伊吹と申します。<br></br>
        福岡のIT系専門学校の29卒学生です。<br></br>
        基本的にバイブコーディングで書いてます。<br></br>
        書いてもらった内容をちゃんと理解できるよう勉強中です。
      </p>
      <div>
        <p className="font-display text-base text-sao-cyan">Profile details</p>
        <p>
          名前：吉田伊吹<br></br>
          卒年：29卒<br></br>
          所属校：福岡デザイン＆テクノロジー専門学校<br></br>
          所属団体：<br></br>
          福岡デザイン＆テクノロジー専門学校公認学生エンジニア団体 Tech.C Venture 副代表

        </p>
      </div>
      <div>
        <p className="font-display mb-2 text-xs tracking-widest text-sao-cyan-dim">SKILLS</p>
        <ul className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-sao-cyan/30 px-3 py-1 text-xs text-sao-cyan"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
