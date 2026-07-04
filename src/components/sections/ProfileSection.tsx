const SKILLS = ['TypeScript', 'React', 'Three.js', 'Node.js']

export function ProfileSection() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-sao-white/90">
      <div>
        <p className="font-display text-base text-sao-cyan">Player Name</p>
        <p className="text-sao-white/60">プレースホルダー：ここに氏名・肩書きを記載</p>
      </div>
      <p>
        プレースホルダー：経歴・自己紹介文をここに記載してください。学生時代の経験、
        興味のある分野、これまでのプロジェクトなどを紹介するセクションです。
      </p>
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
