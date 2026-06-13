'use client';

import type { ProfileData, ExperienceData, EducationData, SkillData } from '@/lib/types';

// ── Types ──────────────────────────────────────────────────────
export interface ResumeRenderData {
  profile: ProfileData | null;
  experiences: ExperienceData[];
  education: EducationData[];
  skills: SkillData[];
}

// ── Helper: Format date as "Jan 2023" ─────────────────────────
function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// ── Helper: Date range string ─────────────────────────────────
function dateRange(start?: string, end?: string, current?: boolean): string {
  const s = formatDate(start);
  const e = current ? 'Present' : formatDate(end);
  if (!s) return '';
  return `${s} – ${e}`;
}

// ── Helper: Full name ─────────────────────────────────────────
function fullName(profile: ProfileData | null): string {
  return [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || 'Your Name';
}

// ── Helper: Parse bullet points from description ──────────────
function parseBullets(description?: string): string[] {
  if (!description) return [];
  // Split by newlines or • character, trim, and filter empty
  return description
    .split(/[\n•]/)
    .map((line) => line.trim())
    .filter(Boolean);
}

// ── A4 wrapper style ──────────────────────────────────────────
const a4Style: React.CSSProperties = {
  width: '210mm',
  height: '297mm',
  padding: '15mm',
  fontFamily: 'Inter, sans-serif',
  background: 'white',
  color: '#1a1a1a',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
};


// ════════════════════════════════════════════════════════════════
// 1. MINIMAL — "Clean & Elegant"
// Single column, name centered, contact with pipes, small caps headers
// Pure black and white only
// ════════════════════════════════════════════════════════════════
function MinimalTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  return (
    <div style={a4Style}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 6px', color: '#000' }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 11, color: '#555', fontWeight: 400, marginBottom: 8 }}>
            {profile.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div style={{ fontSize: 9, color: '#555', letterSpacing: '0.02em' }}>
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}{i < contactItems.length - 1 ? '  |  ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Thin line under contact */}
      <div style={{ borderTop: '0.5px solid #000', marginBottom: 16 }} />

      {/* Summary */}
      {profile?.summary && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, fontVariant: 'small-caps', letterSpacing: '0.1em', marginBottom: 6, color: '#000' }}>
            Summary
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 8 }} />
          <p style={{ fontSize: 10, color: '#333', margin: 0, lineHeight: 1.6 }}>{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, fontVariant: 'small-caps', letterSpacing: '0.1em', marginBottom: 6, color: '#000' }}>
            Experience
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 8 }} />
          {experiences.map((exp) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>{exp.company}</span>
                    {exp.location && <span style={{ fontSize: 9, color: '#666' }}>, {exp.location}</span>}
                  </div>
                  <span style={{ fontSize: 9, color: '#666', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div style={{ fontSize: 10, fontStyle: 'italic', color: '#444' }}>{exp.position}</div>
                {bullets.length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 9.5, color: '#333', lineHeight: 1.55 }}>
                    {bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: 1 }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, fontVariant: 'small-caps', letterSpacing: '0.1em', marginBottom: 6, color: '#000' }}>
            Education
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 8 }} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </span>
                </div>
                <span style={{ fontSize: 9, color: '#666', flexShrink: 0, marginLeft: 8 }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
              <div style={{ fontSize: 9.5, color: '#555' }}>
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
              </div>
              {edu.gpa && <div style={{ fontSize: 9, color: '#666' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, fontVariant: 'small-caps', letterSpacing: '0.1em', marginBottom: 6, color: '#000' }}>
            Skills
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 8 }} />
          <div style={{ fontSize: 9.5, color: '#333', lineHeight: 1.6 }}>
            {skills.map((skill, i) => (
              <span key={skill.id}>
                {skill.name}{i < skills.length - 1 ? '  •  ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 2. MODERN — "Contemporary Two-Column"
// Left sidebar (30%) with dark charcoal, right main area (70%)
// Emerald/teal accent, tech-industry feel
// ════════════════════════════════════════════════════════════════
function ModernTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accent = '#10b981';
  const sidebarBg = '#1a1a2e';

  const sidebarContact = [
    { label: 'Email', value: profile?.email },
    { label: 'Phone', value: profile?.phone },
    { label: 'Location', value: profile?.location },
    { label: 'Website', value: profile?.website },
    { label: 'LinkedIn', value: profile?.linkedin },
    { label: 'GitHub', value: profile?.github },
  ].filter((item) => item.value);

  const skillsByCategory = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    technical: 'Technical',
    soft: 'Soft Skills',
    language: 'Languages',
    other: 'Other',
  };

  return (
    <div style={{ ...a4Style, padding: 0, display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        width: '30%',
        background: sidebarBg,
        color: '#e5e5e5',
        padding: '15mm 6mm',
        boxSizing: 'border-box',
        height: '297mm',
        overflow: 'hidden',
      }}>
        {/* Avatar initials */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: accent, display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: 14,
          fontSize: 20, fontWeight: 700, color: 'white',
        }}>
          {name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
        </div>

        {/* Name */}
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: '0 0 4px', lineHeight: 1.2 }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 10, color: accent, fontWeight: 500, marginBottom: 20 }}>
            {profile.jobTitle}
          </div>
        )}

        {/* Contact */}
        {sidebarContact.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: accent, marginBottom: 10,
              paddingBottom: 4, borderBottom: `1px solid ${accent}60`,
            }}>
              Contact
            </div>
            {sidebarContact.map((item, i) => (
              <div key={i} style={{ marginBottom: 7, fontSize: 8.5 }}>
                <div style={{ color: '#888', fontSize: 7.5, marginBottom: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </div>
                <div style={{ color: '#ccc', wordBreak: 'break-all', lineHeight: 1.4 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: accent, marginBottom: 10,
              paddingBottom: 4, borderBottom: `1px solid ${accent}60`,
            }}>
              Skills
            </div>
            {Object.entries(skillsByCategory).map(([category, catSkills]) => (
              <div key={category} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 7.5, color: '#888', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {categoryLabels[category] || category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {catSkills.map((skill) => (
                    <span key={skill.id} style={{
                      fontSize: 8, background: 'rgba(255,255,255,0.08)',
                      padding: '3px 8px', borderRadius: 10, color: '#bbb',
                      border: `1px solid rgba(255,255,255,0.1)`,
                    }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '15mm 10mm', overflow: 'hidden' }}>
        {/* Summary */}
        {profile?.summary && (
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 6,
              paddingBottom: 4, borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
            }}>
              Profile
            </div>
            <p style={{ fontSize: 10, color: '#444', margin: 0, lineHeight: 1.6 }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 10,
              paddingBottom: 4, borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
            }}>
              Experience
            </div>
            {experiences.map((exp, i) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} style={{
                  marginBottom: i < experiences.length - 1 ? 14 : 0,
                  paddingLeft: 12,
                  borderLeft: `3px solid ${accent}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                      {dateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div style={{ fontSize: 9.5, color: '#555', fontWeight: 500 }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {bullets.length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 14, fontSize: 9.5, color: '#444', lineHeight: 1.55 }}>
                      {bullets.map((b, bi) => (
                        <li key={bi} style={{ marginBottom: 1 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 10,
              paddingBottom: 4, borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
            }}>
              Education
            </div>
            {education.map((edu, i) => (
              <div key={edu.id} style={{
                marginBottom: i < education.length - 1 ? 10 : 0,
                paddingLeft: 12,
                borderLeft: `3px solid ${accent}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div style={{ fontSize: 9.5, color: '#555' }}>
                  {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                </div>
                {edu.gpa && <div style={{ fontSize: 9, color: '#666' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 3. PROFESSIONAL — "Classic Corporate"
// Centered name with double lines, dark navy headers
// Traditional, conservative industries
// ════════════════════════════════════════════════════════════════
function ProfessionalTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const navy = '#1a365d';

  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
  ].filter(Boolean) as string[];

  const webItems = [
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  const allContact = [...contactItems, ...webItems];

  return (
    <div style={a4Style}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        {/* Top double line */}
        <div style={{ borderTop: `2px solid ${navy}`, marginBottom: 3 }} />
        <div style={{ borderTop: `1px solid ${navy}`, marginBottom: 10 }} />

        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.04em', margin: '0 0 4px', color: navy, textTransform: 'uppercase' }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 11, color: '#555', fontWeight: 400, marginBottom: 8 }}>{profile.jobTitle}</div>
        )}

        {/* Contact line */}
        {allContact.length > 0 && (
          <div style={{ fontSize: 9, color: '#555', marginBottom: 6 }}>
            {allContact.map((item, i) => (
              <span key={i}>{item}{i < allContact.length - 1 ? '  •  ' : ''}</span>
            ))}
          </div>
        )}

        {/* Bottom double line */}
        <div style={{ borderTop: `1px solid ${navy}`, marginBottom: 1 }} />
        <div style={{ borderTop: `2px solid ${navy}` }} />
      </div>

      {/* Summary */}
      {profile?.summary && (
        <div style={{ margin: '14px 0' }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: navy, marginBottom: 8, textAlign: 'center',
          }}>
            Professional Summary
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 8 }} />
          <p style={{ fontSize: 10, color: '#333', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: navy, marginBottom: 8, textAlign: 'center',
          }}>
            Professional Experience
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 10 }} />
          {experiences.map((exp) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{exp.position}</span>
                    <span style={{ fontSize: 10, color: '#555', marginLeft: 8 }}>
                      — {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </span>
                  </div>
                  <span style={{ fontSize: 9, color: '#777', fontWeight: 500, flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {bullets.length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 18, fontSize: 10, color: '#444', lineHeight: 1.6 }}>
                    {bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: 2, listStyleType: 'disc' }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: navy, marginBottom: 8, textAlign: 'center',
          }}>
            Education
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 10 }} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </span>
                <span style={{ fontSize: 10, color: '#555', marginLeft: 8 }}>
                  — {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                </span>
              </div>
              <span style={{ fontSize: 9, color: '#777', fontWeight: 500, flexShrink: 0, marginLeft: 8 }}>
                {dateRange(edu.startDate, edu.endDate)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: navy, marginBottom: 8, textAlign: 'center',
          }}>
            Skills
          </div>
          <div style={{ borderTop: '0.5px solid #ccc', marginBottom: 8 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', justifyContent: 'center' }}>
            {skills.map((skill) => (
              <span key={skill.id} style={{ fontSize: 10, color: '#444' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 4. CREATIVE — "Design-Forward"
// Left accent bar (emerald), progress bars for skills
// Timeline dots for experience, emerald accent
// ════════════════════════════════════════════════════════════════
function CreativeTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accent = '#10b981';

  const contactItems = [
    { icon: '📧', value: profile?.email },
    { icon: '📞', value: profile?.phone },
    { icon: '📍', value: profile?.location },
    { icon: '🌐', value: profile?.website },
    { icon: '💼', value: profile?.linkedin },
    { icon: '💻', value: profile?.github },
  ].filter((item) => item.value);

  // Deterministic skill levels based on skill name
  const skillLevels: Record<string, number> = {};
  skills.forEach((skill) => {
    let hash = 0;
    for (let c = 0; c < skill.name.length; c++) {
      hash = ((hash << 5) - hash) + skill.name.charCodeAt(c);
      hash |= 0;
    }
    skillLevels[skill.name] = 65 + Math.abs(hash) % 30; // 65-95
  });

  return (
    <div style={{ ...a4Style, padding: 0, display: 'flex' }}>
      {/* Left accent bar */}
      <div style={{
        width: 5, background: accent, flexShrink: 0,
        height: '297mm',
      }} />

      {/* Content area */}
      <div style={{ flex: 1, padding: '14mm 14mm 14mm 12mm', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <h1 style={{
            fontSize: 22, fontWeight: 800, margin: '0 0 2px',
            color: '#111',
          }}>
            {name}
          </h1>
          {profile?.jobTitle && (
            <div style={{ fontSize: 12, color: accent, fontWeight: 600, letterSpacing: '0.01em' }}>
              {profile.jobTitle}
            </div>
          )}
        </div>

        {/* Contact with icons */}
        {contactItems.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginBottom: 16, fontSize: 9 }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#555' }}>
                <span style={{ fontSize: 10 }}>{item.icon}</span>
                <span>{item.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: `2px solid ${accent}`, marginBottom: 16 }} />

        {/* Summary */}
        {profile?.summary && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 6,
            }}>
              About Me
            </div>
            <p style={{ fontSize: 10, color: '#444', margin: 0, lineHeight: 1.6 }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 10,
            }}>
              Experience
            </div>
            {experiences.map((exp, i) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} style={{
                  marginBottom: i < experiences.length - 1 ? 14 : 0,
                  position: 'relative', paddingLeft: 18,
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: 0, top: 5,
                    width: 8, height: 8, borderRadius: '50%',
                    background: accent, border: '2px solid white',
                    boxShadow: `0 0 0 1px ${accent}`,
                  }} />
                  {/* Timeline line */}
                  {i < experiences.length - 1 && (
                    <div style={{
                      position: 'absolute', left: 3.5, top: 15,
                      width: 1, height: 'calc(100% - 10px)',
                      background: `${accent}40`,
                    }} />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                      {dateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div style={{ fontSize: 9.5, color: '#666', fontWeight: 500 }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {bullets.length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 14, fontSize: 9.5, color: '#444', lineHeight: 1.55 }}>
                      {bullets.map((b, bi) => (
                        <li key={bi} style={{ marginBottom: 1 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 8,
            }}>
              Education
            </div>
            {education.map((edu, i) => (
              <div key={edu.id} style={{
                marginBottom: i < education.length - 1 ? 10 : 0,
                position: 'relative', paddingLeft: 18,
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 5,
                  width: 8, height: 8, borderRadius: '50%',
                  background: accent, border: '2px solid white',
                  boxShadow: `0 0 0 1px ${accent}`,
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div style={{ fontSize: 9.5, color: '#666' }}>
                  {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
                </div>
                {edu.gpa && <div style={{ fontSize: 9, color: '#666' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills with progress bars */}
        {skills.length > 0 && (
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: accent, marginBottom: 8,
            }}>
              Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
              {skills.map((skill) => (
                <div key={skill.id} style={{ width: 'calc(50% - 8px)', minWidth: 120 }}>
                  <div style={{ fontSize: 9, color: '#444', marginBottom: 3, fontWeight: 500 }}>{skill.name}</div>
                  <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${skillLevels[skill.name] || 75}%`,
                      background: `linear-gradient(90deg, ${accent}, #34d399)`,
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 5. EXECUTIVE — "C-Suite Level"
// Dark banner at top with name in white
// Section headers with left border (3px emerald)
// Charcoal banner + emerald accents
// ════════════════════════════════════════════════════════════════
function ExecutiveTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accent = '#10b981';
  const charcoal = '#1f2937';

  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  return (
    <div style={{ ...a4Style, padding: 0 }}>
      {/* Dark Banner */}
      <div style={{
        background: charcoal,
        padding: '20mm 15mm 10mm',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: 26, fontWeight: 800, margin: '0 0 4px',
          color: 'white', letterSpacing: '-0.01em',
        }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 400, letterSpacing: '0.02em' }}>
            {profile.jobTitle}
          </div>
        )}
      </div>

      {/* Contact row */}
      {contactItems.length > 0 && (
        <div style={{
          padding: '6px 15mm',
          fontSize: 9, color: '#555',
          borderBottom: `2px solid ${accent}`,
          display: 'flex', flexWrap: 'wrap', gap: '6px 16px',
        }}>
          {contactItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      )}

      {/* Content area */}
      <div style={{ padding: '8mm 15mm 15mm', overflow: 'hidden' }}>
        {/* Summary */}
        {profile?.summary && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#1f2937', marginBottom: 8,
              paddingLeft: 10, borderLeft: `3px solid ${accent}`,
            }}>
              Executive Summary
            </div>
            <p style={{ fontSize: 10, color: '#333', margin: 0, lineHeight: 1.65, paddingLeft: 10 }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#1f2937', marginBottom: 10,
              paddingLeft: 10, borderLeft: `3px solid ${accent}`,
            }}>
              Professional Experience
            </div>
            {experiences.map((exp) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: 11, fontWeight: 700, margin: 0, color: '#111' }}>{exp.position}</h3>
                    <span style={{ fontSize: 9, color: '#777', flexShrink: 0, marginLeft: 8, fontWeight: 500 }}>
                      {dateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: accent, fontWeight: 600, fontStyle: 'italic' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {bullets.length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 9.5, color: '#444', lineHeight: 1.55 }}>
                      {bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: 1 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#1f2937', marginBottom: 8,
              paddingLeft: 10, borderLeft: `3px solid ${accent}`,
            }}>
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 8, paddingLeft: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </span>
                  <span style={{ fontSize: 9.5, color: '#555', marginLeft: 8 }}>
                    — {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                  </span>
                </div>
                <span style={{ fontSize: 9, color: '#777', flexShrink: 0, marginLeft: 8 }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#1f2937', marginBottom: 8,
              paddingLeft: 10, borderLeft: `3px solid ${accent}`,
            }}>
              Core Competencies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 6px', paddingLeft: 10 }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{
                  fontSize: 9, color: '#333',
                  background: '#f3f4f6', padding: '3px 10px',
                  borderRadius: 2, border: '1px solid #e5e7eb',
                }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 6. COMPACT — "Maximum Content"
// Two-column throughout, 9-10pt, name left + contact right
// Skills comma-separated, company+position same line
// Gray and black only
// ════════════════════════════════════════════════════════════════
function CompactTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  return (
    <div style={{ ...a4Style, padding: '10mm 12mm', fontSize: 9, lineHeight: 1.4 }}>
      {/* Header: Name left, contact right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1.5px solid #333', paddingBottom: 4, marginBottom: 6 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '-0.01em', color: '#000' }}>
          {name}
        </h1>
        <div style={{ fontSize: 7.5, color: '#666', textAlign: 'right', lineHeight: 1.5, maxWidth: '55%' }}>
          {contactItems.map((item, i) => (
            <span key={i}>{item}{i < contactItems.length - 1 ? '  •  ' : ''}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      {profile?.summary && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3, color: '#000' }}>
            Summary
          </div>
          <p style={{ fontSize: 8.5, color: '#444', margin: 0, lineHeight: 1.5 }}>{profile.summary}</p>
        </div>
      )}

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Left column - Experience & Education */}
        <div style={{ flex: 3 }}>
          {/* Experience */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '0.5px solid #999', paddingBottom: 2, marginBottom: 4, color: '#000' }}>
                Experience
              </div>
              {experiences.map((exp) => {
                const bullets = parseBullets(exp.description);
                return (
                  <div key={exp.id} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 600, fontSize: 9, color: '#000' }}>
                        {exp.position}{exp.company ? `, ${exp.company}` : ''}{exp.location ? ` — ${exp.location}` : ''}
                      </span>
                      <span style={{ fontSize: 7.5, color: '#888', flexShrink: 0, marginLeft: 6 }}>
                        {dateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    {bullets.length > 0 && (
                      <ul style={{ margin: '2px 0 0', paddingLeft: 12, fontSize: 8, color: '#444', lineHeight: 1.45 }}>
                        {bullets.map((b, i) => (
                          <li key={i} style={{ marginBottom: 0 }}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '0.5px solid #999', paddingBottom: 2, marginBottom: 4, color: '#000' }}>
                Education
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 600, fontSize: 9, color: '#000' }}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.institution ? `, ${edu.institution}` : ''}{edu.location ? ` — ${edu.location}` : ''}
                    </span>
                    <span style={{ fontSize: 7.5, color: '#888', flexShrink: 0, marginLeft: 6 }}>
                      {dateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <span style={{ fontSize: 7.5, color: '#666' }}>GPA: {edu.gpa}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column - Skills */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {skills.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '0.5px solid #999', paddingBottom: 2, marginBottom: 4, color: '#000' }}>
                Skills
              </div>
              <div style={{ fontSize: 8, color: '#444', lineHeight: 1.6 }}>
                {skills.map((skill, i) => (
                  <span key={skill.id}>
                    {skill.name}{i < skills.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// Main renderResume function
// ════════════════════════════════════════════════════════════════
export function renderResume(templateId: string, data: ResumeRenderData): React.ReactNode {
  switch (templateId) {
    case 'minimal':
      return <MinimalTemplate {...data} />;
    case 'modern':
      return <ModernTemplate {...data} />;
    case 'professional':
      return <ProfessionalTemplate {...data} />;
    case 'creative':
      return <CreativeTemplate {...data} />;
    case 'executive':
      return <ExecutiveTemplate {...data} />;
    case 'compact':
      return <CompactTemplate {...data} />;
    default:
      return <MinimalTemplate {...data} />;
  }
}

// ── Template metadata ─────────────────────────────────────────
export const TEMPLATE_LIST = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and elegant single-column layout' },
  { id: 'modern', name: 'Modern', description: 'Contemporary two-column with dark sidebar' },
  { id: 'professional', name: 'Professional', description: 'Classic corporate format' },
  { id: 'creative', name: 'Creative', description: 'Design-forward with visual accents' },
  { id: 'executive', name: 'Executive', description: 'C-Suite level professional format' },
  { id: 'compact', name: 'Compact', description: 'Maximum content, minimum space' },
];
