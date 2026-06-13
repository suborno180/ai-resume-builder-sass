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
  minHeight: '297mm',
  padding: '15mm',
  fontFamily: 'Inter, sans-serif',
  background: 'white',
  color: '#1a1a1a',
  position: 'relative',
  overflow: 'visible',
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 6 }}>
          {profile?.image && (
            <img
              src={profile.image}
              alt=""
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: '#000' }}>
            {name}
          </h1>
        </div>
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
        minHeight: '297mm',
        overflow: 'visible',
      }}>
        {/* Avatar */}
        {profile?.image ? (
          <img
            src={profile.image}
            alt=""
            style={{
              width: 40, height: 40, borderRadius: '50%',
              objectFit: 'cover', marginBottom: 14,
            }}
          />
        ) : (
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: accent, display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: 14,
            fontSize: 20, fontWeight: 700, color: 'white',
          }}>
            {name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
        )}

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
      <div style={{ flex: 1, padding: '15mm 10mm', overflow: 'visible' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 4 }}>
          {profile?.image && (
            <img
              src={profile.image}
              alt=""
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.04em', margin: 0, color: navy, textTransform: 'uppercase' }}>
            {name}
          </h1>
        </div>
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
        minHeight: '297mm',
      }} />

      {/* Content area */}
      <div style={{ flex: 1, padding: '14mm 14mm 14mm 12mm', overflow: 'visible' }}>
        {/* Header */}
        <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          {profile?.image && (
            <img
              src={profile.image}
              alt=""
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <div>
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
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        {profile?.image && (
          <img
            src={profile.image}
            alt=""
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        <div>
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
      <div style={{ padding: '8mm 15mm 15mm', overflow: 'visible' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #333', paddingBottom: 4, marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {profile?.image && (
            <img
              src={profile.image}
              alt=""
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '-0.01em', color: '#000' }}>
            {name}
          </h1>
        </div>
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
// 7. ELEGANT — "Timeless Sophistication"
// Single column, serif headings, double-line borders, centered name
// Deep navy headings, italic company names
// ════════════════════════════════════════════════════════════════
function ElegantTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const navy = '#1e3a5f';

  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    fontVariant: 'small-caps',
    letterSpacing: '0.12em',
    color: navy,
    marginBottom: 4,
    paddingBottom: 3,
    borderBottom: '0.5px solid #1e3a5f40',
    display: 'inline-block',
  };

  return (
    <div style={{ ...a4Style, fontFamily: 'Inter, sans-serif' }}>
      {/* Top double-line border */}
      <div style={{ borderTop: '1.5px solid #1e3a5f30', marginBottom: 2 }} />
      <div style={{ borderTop: '0.5px solid #1e3a5f20', marginBottom: 16 }} />

      {/* Header - centered */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{
          fontSize: 24, fontWeight: 400, margin: '0 0 6px', color: navy,
          fontFamily: 'Georgia, serif', letterSpacing: '0.03em',
        }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 11, color: '#555', fontWeight: 400, marginBottom: 8, letterSpacing: '0.02em' }}>
            {profile.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div style={{ fontSize: 9, color: '#666', letterSpacing: '0.02em' }}>
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}{i < contactItems.length - 1 ? '  ·  ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {profile?.summary && (
        <div style={{ marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Summary</div>
          <p style={{ fontSize: 10, color: '#444', margin: '6px 0 0', lineHeight: 1.65 }}>{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Experience</div>
          {experiences.map((exp) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#222' }}>{exp.position}</span>
                  </div>
                  <span style={{ fontSize: 9, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div style={{ fontSize: 10, fontStyle: 'italic', color: navy, fontWeight: 500 }}>
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
          <div style={sectionHeaderStyle}>Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#222' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </span>
                </div>
                <span style={{ fontSize: 9, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
              <div style={{ fontSize: 9.5, color: '#555' }}>
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
              </div>
              {edu.gpa && <div style={{ fontSize: 9, color: '#777' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <div style={sectionHeaderStyle}>Skills</div>
          <div style={{ fontSize: 9.5, color: '#444', lineHeight: 1.7, marginTop: 6 }}>
            {skills.map((skill, i) => (
              <span key={skill.id}>
                {skill.name}{i < skills.length - 1 ? '  •  ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom double-line border */}
      <div style={{ marginTop: 20 }}>
        <div style={{ borderTop: '0.5px solid #1e3a5f20', marginBottom: 2 }} />
        <div style={{ borderTop: '1.5px solid #1e3a5f30' }} />
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 8. TECHNICAL — "Developer Focused"
// Two-column: left sidebar (30%) dark navy, right (70%) white
// Monospace name, emoji icons, colored skill pills, code-style headers
// ════════════════════════════════════════════════════════════════
function TechnicalTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const sidebarBg = '#0f172a';
  const accent = '#10b981';

  const contactWithIcons = [
    { icon: '📧', value: profile?.email, label: 'Email' },
    { icon: '📱', value: profile?.phone, label: 'Phone' },
    { icon: '🌐', value: profile?.website, label: 'Website' },
    { icon: '💼', value: profile?.linkedin, label: 'LinkedIn' },
    { icon: '🐙', value: profile?.github, label: 'GitHub' },
    { icon: '📍', value: profile?.location, label: 'Location' },
  ].filter((item) => item.value);

  const skillsByCategory = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryColors: Record<string, { bg: string; text: string }> = {
    technical: { bg: '#065f46', text: '#6ee7b7' },
    soft: { bg: '#1e3a5f', text: '#93c5fd' },
    language: { bg: '#581c87', text: '#d8b4fe' },
    other: { bg: '#374151', text: '#9ca3af' },
  };

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
        minHeight: '297mm',
        overflow: 'visible',
      }}>
        {/* Name & Title */}
        <h1 style={{
          fontSize: 18, fontWeight: 700, color: 'white',
          fontFamily: "'Courier New', Courier, monospace",
          margin: '0 0 4px', lineHeight: 1.2,
        }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{
            fontSize: 9, color: accent, fontWeight: 500,
            fontFamily: "'Courier New', Courier, monospace",
            marginBottom: 20,
          }}>
            {profile.jobTitle}
          </div>
        )}

        {/* Contact with emoji icons */}
        {contactWithIcons.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: accent, marginBottom: 10,
              fontFamily: "'Courier New', Courier, monospace",
            }}>
              {"Contact"}
            </div>
            {contactWithIcons.map((item, i) => (
              <div key={i} style={{ marginBottom: 6, fontSize: 8.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10 }}>{item.icon}</span>
                <span style={{ color: '#ccc', wordBreak: 'break-all', lineHeight: 1.4 }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills with colored pills */}
        {skills.length > 0 && (
          <div>
            <div style={{
              fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: accent, marginBottom: 10,
              fontFamily: "'Courier New', Courier, monospace",
            }}>
              {"Skills"}
            </div>
            {Object.entries(skillsByCategory).map(([category, catSkills]) => (
              <div key={category} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 7.5, color: '#94a3b8', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {categoryLabels[category] || category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {catSkills.map((skill) => {
                    const colors = categoryColors[category] || categoryColors.other;
                    return (
                      <span key={skill.id} style={{
                        fontSize: 8, background: colors.bg,
                        padding: '3px 8px', borderRadius: 10, color: colors.text,
                        border: `1px solid ${colors.text}30`,
                      }}>
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '15mm 10mm', overflow: 'visible' }}>
        {/* Summary */}
        {profile?.summary && (
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: accent,
              fontFamily: "'Courier New', Courier, monospace",
              marginBottom: 6, paddingBottom: 4,
              borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
            }}>
              ## Profile
            </div>
            <p style={{ fontSize: 10, color: '#444', margin: 0, lineHeight: 1.6 }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: accent,
              fontFamily: "'Courier New', Courier, monospace",
              marginBottom: 10, paddingBottom: 4,
              borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
            }}>
              ## Experience
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
                    <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8, fontFamily: "'Courier New', Courier, monospace" }}>
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
              fontSize: 11, fontWeight: 700, color: accent,
              fontFamily: "'Courier New', Courier, monospace",
              marginBottom: 10, paddingBottom: 4,
              borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
            }}>
              ## Education
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
                  <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8, fontFamily: "'Courier New', Courier, monospace" }}>
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
// 9. ACADEMIC — "Research & Education"
// Single column, traditional academic CV
// Education FIRST, pure black and white, serif headings, dense
// ════════════════════════════════════════════════════════════════
function AcademicTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);

  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    fontVariant: 'small-caps',
    letterSpacing: '0.1em',
    color: '#000',
    marginBottom: 4,
    paddingBottom: 2,
    borderBottom: '0.5px solid #000',
  };

  return (
    <div style={{ ...a4Style, padding: '12mm 15mm', fontFamily: 'Inter, sans-serif' }}>
      {/* Header - centered */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <h1 style={{
          fontSize: 20, fontWeight: 400, margin: '0 0 4px', color: '#000',
          fontFamily: 'Georgia, Times New Roman, serif', letterSpacing: '0.02em',
        }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 10, color: '#333', fontWeight: 400, marginBottom: 4 }}>
            {profile.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div style={{ fontSize: 9, color: '#333' }}>
            {contactItems.map((item, i) => (
              <span key={i}>{item}{i < contactItems.length - 1 ? '  •  ' : ''}</span>
            ))}
          </div>
        )}
      </div>

      {/* Research Interest (summary) */}
      {profile?.summary && (
        <div style={{ marginBottom: 12 }}>
          <div style={sectionHeaderStyle}>Research Interests</div>
          <p style={{ fontSize: 10, color: '#222', margin: '4px 0 0', lineHeight: 1.5 }}>{profile.summary}</p>
        </div>
      )}

      {/* Education FIRST — academic style */}
      {education.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={sectionHeaderStyle}>Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </span>
                <span style={{ fontSize: 9, color: '#333', flexShrink: 0, marginLeft: 8 }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
              <div style={{ fontSize: 9.5, color: '#333' }}>
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
              </div>
              {edu.gpa && <span style={{ fontSize: 9, color: '#333' }}> — GPA: {edu.gpa}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={sectionHeaderStyle}>Experience</div>
          {experiences.map((exp) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>{exp.position}</span>
                  <span style={{ fontSize: 9, color: '#333', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div style={{ fontSize: 9.5, fontStyle: 'italic', color: '#222' }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {bullets.length > 0 && (
                  <ul style={{ margin: '3px 0 0', paddingLeft: 16, fontSize: 9.5, color: '#222', lineHeight: 1.45 }}>
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

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={sectionHeaderStyle}>Skills</div>
          <div style={{ fontSize: 9.5, color: '#222', lineHeight: 1.5 }}>
            {skills.map((skill, i) => (
              <span key={skill.id}>
                {skill.name}{i < skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Awards / Hobbies (skip if no hobbies) */}
      {profile?.hobbies && (
        <div>
          <div style={sectionHeaderStyle}>Awards &amp; Interests</div>
          <p style={{ fontSize: 9.5, color: '#222', margin: '4px 0 0', lineHeight: 1.5 }}>{profile.hobbies}</p>
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 10. BOLD — "Stand Out"
// Vibrant gradient header banner (emerald → amber)
// Two-column below: left 65% (Experience, Education), right 35% (Contact, Skills, Hobbies)
// Colored left borders on sections, rounded skill tags
// ════════════════════════════════════════════════════════════════
function BoldTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const gradientFrom = '#10b981';
  const gradientTo = '#f59e0b';

  const contactWithIcons = [
    { icon: '📧', value: profile?.email },
    { icon: '📱', value: profile?.phone },
    { icon: '📍', value: profile?.location },
    { icon: '🌐', value: profile?.website },
    { icon: '💼', value: profile?.linkedin },
    { icon: '🐙', value: profile?.github },
  ].filter((item) => item.value);

  const skillsByCategory = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryColors: Record<string, string> = {
    technical: '#10b981',
    soft: '#f59e0b',
    language: '#8b5cf6',
    other: '#6b7280',
  };

  const categoryLabels: Record<string, string> = {
    technical: 'Technical',
    soft: 'Soft Skills',
    language: 'Languages',
    other: 'Other',
  };

  const sectionHeaderStyle = (color: string): React.CSSProperties => ({
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#1f2937',
    marginBottom: 8,
    paddingLeft: 10,
    borderLeft: `3px solid ${color}`,
  });

  return (
    <div style={{ ...a4Style, padding: 0 }}>
      {/* Gradient Header Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        padding: '20mm 15mm 12mm',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: 28, fontWeight: 800, margin: '0 0 4px',
          color: 'white', letterSpacing: '-0.01em',
        }}>
          {name}
        </h1>
        {profile?.jobTitle && (
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 400, letterSpacing: '0.02em' }}>
            {profile.jobTitle}
          </div>
        )}
      </div>

      {/* Two-column body */}
      <div style={{ padding: '8mm 15mm 15mm', display: 'flex', gap: 20, overflow: 'visible' }}>
        {/* Left column (65%) - Experience & Education */}
        <div style={{ flex: 65 }}>
          {/* Summary */}
          {profile?.summary && (
            <div style={{ marginBottom: 16 }}>
              <div style={sectionHeaderStyle(gradientFrom)}>Profile</div>
              <p style={{ fontSize: 10, color: '#444', margin: 0, lineHeight: 1.65, paddingLeft: 10 }}>{profile.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={sectionHeaderStyle(gradientFrom)}>Experience</div>
              {experiences.map((exp) => {
                const bullets = parseBullets(exp.description);
                return (
                  <div key={exp.id} style={{ marginBottom: 12, paddingLeft: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: 11, fontWeight: 700, margin: 0, color: '#111' }}>{exp.position}</h3>
                      <span style={{ fontSize: 8.5, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                        {dateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: '#555', fontWeight: 500 }}>
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </div>
                    {bullets.length > 0 && (
                      <ul style={{ margin: '4px 0 0', paddingLeft: 14, fontSize: 9.5, color: '#444', lineHeight: 1.55 }}>
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
            <div>
              <div style={sectionHeaderStyle(gradientTo)}>Education</div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 8, paddingLeft: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </span>
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

        {/* Right column (35%) - Contact, Skills, Hobbies */}
        <div style={{ flex: 35, minWidth: 0 }}>
          {/* Contact */}
          {contactWithIcons.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={sectionHeaderStyle(gradientFrom)}>Contact</div>
              <div style={{ paddingLeft: 10 }}>
                {contactWithIcons.map((item, i) => (
                  <div key={i} style={{ marginBottom: 5, fontSize: 9, display: 'flex', alignItems: 'center', gap: 6, color: '#444' }}>
                    <span style={{ fontSize: 10 }}>{item.icon}</span>
                    <span style={{ wordBreak: 'break-all', lineHeight: 1.4 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={sectionHeaderStyle(gradientTo)}>Skills</div>
              <div style={{ paddingLeft: 10 }}>
                {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                  <div key={category} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 8, color: '#888', marginBottom: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {categoryLabels[category] || category}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {catSkills.map((skill) => {
                        const color = categoryColors[category] || categoryColors.other;
                        return (
                          <span key={skill.id} style={{
                            fontSize: 8, background: `${color}18`,
                            padding: '3px 8px', borderRadius: 12, color: color,
                            border: `1px solid ${color}40`,
                            fontWeight: 500,
                          }}>
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {profile?.hobbies && (
            <div>
              <div style={sectionHeaderStyle(gradientFrom)}>Hobbies</div>
              <p style={{ fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6, paddingLeft: 10 }}>{profile.hobbies}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// 11. SWISS — "Swiss Design"
// Clean grid-based layout with thick left accent bar and geometric structure
// ════════════════════════════════════════════════════════════════
function SwissTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accentColor = '#dc2626';

  const contactItems = [
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.website,
    profile?.linkedin,
    profile?.github,
  ].filter(Boolean) as string[];

  return (
    <div style={{ ...a4Style, padding: 0, display: 'flex', overflow: 'visible' }}>
      {/* Thick left accent bar */}
      <div style={{ width: 8, background: accentColor, flexShrink: 0 }} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '12mm 15mm 15mm' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            {profile?.image && (
              <img src={profile.image} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            )}
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: accentColor, textTransform: 'uppercase' }}>
                {name}
              </h1>
              {profile?.jobTitle && (
                <div style={{ fontSize: 11, color: '#444', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {profile.jobTitle}
                </div>
              )}
            </div>
          </div>
          {contactItems.length > 0 && (
            <div style={{ fontSize: 8.5, color: '#555', letterSpacing: '0.03em', marginTop: 6 }}>
              {contactItems.map((item, i) => (
                <span key={i}>{item}{i < contactItems.length - 1 ? '  ·  ' : ''}</span>
              ))}
            </div>
          )}
          <div style={{ height: 3, background: accentColor, marginTop: 12 }} />
        </div>

        {/* Summary */}
        {profile?.summary && (
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, color: '#111' }}>
              Summary
            </h2>
            <p style={{ fontSize: 9.5, color: '#333', margin: 0, lineHeight: 1.65 }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, color: '#111' }}>
              Experience
            </h2>
            {experiences.map((exp) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: `2px solid ${accentColor}30` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: 10, fontWeight: 700, margin: 0, color: '#111' }}>{exp.position}</h3>
                    <span style={{ fontSize: 8, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                      {dateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div style={{ fontSize: 9, color: accentColor, fontWeight: 600 }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {bullets.length > 0 && (
                    <ul style={{ margin: '3px 0 0', paddingLeft: 14, fontSize: 9, color: '#444', lineHeight: 1.5 }}>
                      {bullets.map((b, i) => <li key={i} style={{ marginBottom: 1 }}>{b}</li>)}
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
            <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, color: '#111' }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 6, paddingLeft: 10, borderLeft: `2px solid ${accentColor}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </span>
                  <span style={{ fontSize: 8, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <div style={{ fontSize: 9, color: accentColor, fontWeight: 500 }}>{edu.institution}</div>
                {edu.gpa && <div style={{ fontSize: 8.5, color: '#666' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, color: '#111' }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{
                  fontSize: 8.5, background: `${accentColor}10`, padding: '3px 10px',
                  borderRadius: 2, color: '#333', fontWeight: 500, borderLeft: `2px solid ${accentColor}`,
                }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {profile?.hobbies && (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, color: '#111' }}>
              Interests
            </h2>
            <p style={{ fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{profile.hobbies}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 12. CORPORATE — "Corporate Blue"
// Traditional corporate style with teal accents and structured sections
// ════════════════════════════════════════════════════════════════
function CorporateTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accentColor = '#0d9488';

  const contactItems = [
    { label: 'Email', value: profile?.email },
    { label: 'Phone', value: profile?.phone },
    { label: 'Location', value: profile?.location },
    { label: 'Web', value: profile?.website },
    { label: 'LinkedIn', value: profile?.linkedin },
    { label: 'GitHub', value: profile?.github },
  ].filter((item) => item.value);

  const skillsByCategory = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div style={{ ...a4Style, padding: 0, overflow: 'visible' }}>
      {/* Header bar */}
      <div style={{ background: accentColor, padding: '14mm 15mm 10mm', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {profile?.image && (
            <img src={profile.image} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(255,255,255,0.5)' }} />
          )}
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'white', letterSpacing: '-0.01em' }}>{name}</h1>
            {profile?.jobTitle && (
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 400, marginTop: 2 }}>{profile.jobTitle}</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '8mm 15mm 15mm' }}>
        {/* Contact row */}
        {contactItems.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16, padding: '8px 12px', background: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ fontSize: 8.5, color: '#444' }}>
                <span style={{ fontWeight: 600, color: accentColor }}>{item.label}: </span>
                <span style={{ wordBreak: 'break-all' }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {profile?.summary && (
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, paddingBottom: 4, borderBottom: `2px solid ${accentColor}30` }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: 9.5, color: '#333', margin: 0, lineHeight: 1.65 }}>{profile.summary}</p>
          </div>
        )}

        {/* Two columns for Experience/Education */}
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Left column - Experience */}
          <div style={{ flex: 1 }}>
            {experiences.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingBottom: 4, borderBottom: `2px solid ${accentColor}30` }}>
                  Work Experience
                </h2>
                {experiences.map((exp) => {
                  const bullets = parseBullets(exp.description);
                  return (
                    <div key={exp.id} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 style={{ fontSize: 10, fontWeight: 700, margin: 0, color: '#111' }}>{exp.position}</h3>
                        <span style={{ fontSize: 8, color: '#888', flexShrink: 0, marginLeft: 8 }}>
                          {dateRange(exp.startDate, exp.endDate, exp.current)}
                        </span>
                      </div>
                      <div style={{ fontSize: 9, color: accentColor, fontWeight: 600 }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </div>
                      {bullets.length > 0 && (
                        <ul style={{ margin: '3px 0 0', paddingLeft: 14, fontSize: 9, color: '#444', lineHeight: 1.5 }}>
                          {bullets.map((b, i) => <li key={i} style={{ marginBottom: 1 }}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column - Education & Skills */}
          <div style={{ width: '35%', minWidth: 0 }}>
            {education.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingBottom: 4, borderBottom: `2px solid ${accentColor}30` }}>
                  Education
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: '#111' }}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </div>
                    <div style={{ fontSize: 9, color: '#555' }}>{edu.institution}</div>
                    <div style={{ fontSize: 8, color: '#888' }}>{dateRange(edu.startDate, edu.endDate)}</div>
                    {edu.gpa && <div style={{ fontSize: 8, color: '#666' }}>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingBottom: 4, borderBottom: `2px solid ${accentColor}30` }}>
                  Skills
                </h2>
                {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                  <div key={category} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 8, color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>{category}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {catSkills.map((skill) => (
                        <span key={skill.id} style={{
                          fontSize: 8, background: `${accentColor}12`, padding: '2px 8px',
                          borderRadius: 10, color: '#333', fontWeight: 500,
                        }}>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {profile?.hobbies && (
              <div>
                <h2 style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, paddingBottom: 4, borderBottom: `2px solid ${accentColor}30` }}>
                  Interests
                </h2>
                <p style={{ fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6 }}>{profile.hobbies}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 13. INFRESH — "Infresh"
// Modern fresh layout with rounded sections and soft shadows
// ════════════════════════════════════════════════════════════════
function InfreshTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accent = '#7c3aed';

  const contactItems = [
    profile?.email, profile?.phone, profile?.location,
    profile?.website, profile?.linkedin, profile?.github,
  ].filter(Boolean) as string[];

  return (
    <div style={{ ...a4Style, padding: 0, background: '#fafafa', overflow: 'visible' }}>
      {/* Header with pill-shaped background */}
      <div style={{ padding: '14mm 15mm 8mm' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          {profile?.image && (
            <img src={profile.image} alt="" style={{ width: 40, height: 40, borderRadius: 16, objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
          )}
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#111', letterSpacing: '-0.02em' }}>{name}</h1>
            {profile?.jobTitle && (
              <div style={{ fontSize: 11, color: accent, fontWeight: 600, marginTop: 2 }}>{profile.jobTitle}</div>
            )}
          </div>
        </div>
        {contactItems.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{
                fontSize: 8, background: 'white', padding: '3px 10px',
                borderRadius: 12, color: '#555', border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)', wordBreak: 'break-all',
              }}>
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '0 15mm 15mm' }}>
        {/* Summary */}
        {profile?.summary && (
          <div style={{ background: 'white', borderRadius: 10, padding: 14, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              About Me
            </h2>
            <p style={{ fontSize: 9.5, color: '#444', margin: 0, lineHeight: 1.6 }}>{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={{ background: 'white', borderRadius: 10, padding: 14, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Experience
            </h2>
            {experiences.map((exp, idx) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} style={{ marginBottom: idx < experiences.length - 1 ? 10 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: 10, fontWeight: 700, margin: 0, color: '#111' }}>{exp.position}</h3>
                    <span style={{ fontSize: 8, color: '#999', flexShrink: 0, marginLeft: 8, background: '#f3f4f6', padding: '2px 8px', borderRadius: 8 }}>
                      {dateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div style={{ fontSize: 9, color: accent, fontWeight: 600 }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {bullets.length > 0 && (
                    <ul style={{ margin: '3px 0 0', paddingLeft: 14, fontSize: 9, color: '#444', lineHeight: 1.5 }}>
                      {bullets.map((b, i) => <li key={i} style={{ marginBottom: 1 }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Education & Skills side by side */}
        <div style={{ display: 'flex', gap: 12 }}>
          {education.length > 0 && (
            <div style={{ flex: 1, background: 'white', borderRadius: 10, padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#111' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div style={{ fontSize: 9, color: '#555' }}>{edu.institution}</div>
                  <div style={{ fontSize: 8, color: '#999' }}>{dateRange(edu.startDate, edu.endDate)}</div>
                  {edu.gpa && <div style={{ fontSize: 8, color: '#666' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ flex: 1, background: 'white', borderRadius: 10, padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{
                    fontSize: 8, background: `${accent}12`, padding: '3px 10px',
                    borderRadius: 14, color: accent, fontWeight: 500,
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
              {profile?.hobbies && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 8, fontWeight: 600, color: '#888', marginBottom: 3, textTransform: 'uppercase' }}>Interests</div>
                  <p style={{ fontSize: 8.5, color: '#555', margin: 0, lineHeight: 1.5 }}>{profile.hobbies}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 14. TYPOGRAPH — "Typograph"
// Typography-first design with large name, minimal decoration, editorial style
// ════════════════════════════════════════════════════════════════
function TypographTemplate({ profile, experiences, education, skills }: ResumeRenderData) {
  const name = fullName(profile);
  const accent = '#ea580c';

  const contactItems = [
    profile?.email, profile?.phone, profile?.location,
    profile?.website, profile?.linkedin, profile?.github,
  ].filter(Boolean) as string[];

  return (
    <div style={{ ...a4Style, padding: '18mm 18mm 15mm', overflow: 'visible' }}>
      {/* Name - oversized */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{
          fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', margin: 0,
          color: '#000', lineHeight: 1, textTransform: 'uppercase',
        }}>
          {name}
        </h1>
      </div>

      {/* Job title + image */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        {profile?.jobTitle && (
          <div style={{ fontSize: 13, color: accent, fontWeight: 600, letterSpacing: '0.02em' }}>
            {profile.jobTitle}
          </div>
        )}
        {profile?.image && (
          <img src={profile.image} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginLeft: 'auto' }} />
        )}
      </div>

      {/* Contact line */}
      {contactItems.length > 0 && (
        <div style={{ fontSize: 8.5, color: '#666', letterSpacing: '0.02em', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid #ddd' }}>
          {contactItems.map((item, i) => (
            <span key={i}>{item}{i < contactItems.length - 1 ? <span style={{ color: accent, margin: '0 6px' }}>|</span> : ''}</span>
          ))}
        </div>
      )}

      {/* Summary */}
      {profile?.summary && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6, color: accent }}>
            Profile
          </div>
          <p style={{ fontSize: 10, color: '#333', margin: 0, lineHeight: 1.7, fontWeight: 300 }}>{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10, color: accent }}>
            Experience
          </div>
          {experiences.map((exp, idx) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} style={{ marginBottom: idx < experiences.length - 1 ? 12 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 11, fontWeight: 700, margin: 0, color: '#000' }}>{exp.position}</h3>
                  <span style={{ fontSize: 8, color: '#999', flexShrink: 0, marginLeft: 8 }}>
                    {dateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: accent, fontWeight: 500, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {bullets.length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 9.5, color: '#444', lineHeight: 1.6, fontWeight: 300 }}>
                    {bullets.map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, color: accent }}>
            Education
          </div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </span>
                <span style={{ fontSize: 8, color: '#999', flexShrink: 0, marginLeft: 8 }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
              <div style={{ fontSize: 9.5, color: accent, fontWeight: 500, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{edu.institution}</div>
              {edu.gpa && <div style={{ fontSize: 8.5, color: '#666' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills + Hobbies */}
      <div style={{ display: 'flex', gap: 24 }}>
        {skills.length > 0 && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, color: accent }}>
              Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ fontSize: 9, color: '#333', fontWeight: 400 }}>
                  {skill.name}{skills.indexOf(skill) < skills.length - 1 ? <span style={{ color: accent, marginLeft: 6 }}>·</span> : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        {profile?.hobbies && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, color: accent }}>
              Interests
            </div>
            <p style={{ fontSize: 9, color: '#555', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{profile.hobbies}</p>
          </div>
        )}
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
    case 'elegant':
      return <ElegantTemplate {...data} />;
    case 'technical':
      return <TechnicalTemplate {...data} />;
    case 'academic':
      return <AcademicTemplate {...data} />;
    case 'bold':
      return <BoldTemplate {...data} />;
    case 'swiss':
      return <SwissTemplate {...data} />;
    case 'corporate':
      return <CorporateTemplate {...data} />;
    case 'infresh':
      return <InfreshTemplate {...data} />;
    case 'typograph':
      return <TypographTemplate {...data} />;
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
  { id: 'elegant', name: 'Elegant', description: 'Timeless sophistication with serif headings' },
  { id: 'technical', name: 'Technical', description: 'Developer-focused with code-style accents' },
  { id: 'academic', name: 'Academic', description: 'Traditional academic CV with education first' },
  { id: 'bold', name: 'Bold', description: 'Stand out with a vibrant gradient header' },
  { id: 'swiss', name: 'Swiss', description: 'Grid-based layout with red accent bar' },
  { id: 'corporate', name: 'Corporate', description: 'Traditional corporate with teal header' },
  { id: 'infresh', name: 'Infresh', description: 'Modern card-based with rounded sections' },
  { id: 'typograph', name: 'Typograph', description: 'Typography-first editorial design' },
];
