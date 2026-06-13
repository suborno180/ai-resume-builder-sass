module.exports = [
"[project]/src/components/resume-templates.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TEMPLATE_LIST",
    ()=>TEMPLATE_LIST,
    "renderResume",
    ()=>renderResume
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
// ── Helper: Format date as "Jan 2023" ─────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });
}
// ── Helper: Date range string ─────────────────────────────────
function dateRange(start, end, current) {
    const s = formatDate(start);
    const e = current ? 'Present' : formatDate(end);
    if (!s) return '';
    return `${s} – ${e}`;
}
// ── Helper: Full name ─────────────────────────────────────────
function fullName(profile) {
    return [
        profile?.firstName,
        profile?.lastName
    ].filter(Boolean).join(' ') || 'Your Name';
}
// ── Helper: Parse bullet points from description ──────────────
function parseBullets(description) {
    if (!description) return [];
    // Split by newlines or • character, trim, and filter empty
    return description.split(/[\n•]/).map((line)=>line.trim()).filter(Boolean);
}
// ── A4 wrapper style ──────────────────────────────────────────
const a4Style = {
    width: '210mm',
    minHeight: '297mm',
    padding: '15mm',
    fontFamily: 'Inter, sans-serif',
    background: 'white',
    color: '#1a1a1a',
    position: 'relative',
    overflow: 'visible',
    boxSizing: 'border-box'
};
// ════════════════════════════════════════════════════════════════
// 1. MINIMAL — "Clean & Elegant"
// Single column, name centered, contact with pipes, small caps headers
// Pure black and white only
// ════════════════════════════════════════════════════════════════
function MinimalTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: a4Style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                            marginBottom: 6
                        },
                        children: [
                            profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.image,
                                alt: "",
                                style: {
                                    width: 48,
                                    height: 60,
                                    borderRadius: 4,
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    flexShrink: 0,
                                    border: '1.5px solid #ddd'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    margin: 0,
                                    color: '#000'
                                },
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: '#555',
                            fontWeight: 400,
                            marginBottom: 8
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9,
                            color: '#555',
                            letterSpacing: '0.02em'
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    item,
                                    i < contactItems.length - 1 ? '  |  ' : ''
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '0.5px solid #000',
                    marginBottom: 16
                }
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            fontWeight: 600,
                            fontVariant: 'small-caps',
                            letterSpacing: '0.1em',
                            marginBottom: 6,
                            color: '#000'
                        },
                        children: "Summary"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: '#333',
                            margin: 0,
                            lineHeight: 1.6
                        },
                        children: profile.summary
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            fontWeight: 600,
                            fontVariant: 'small-caps',
                            letterSpacing: '0.1em',
                            marginBottom: 6,
                            color: '#000'
                        },
                        children: "Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    experiences.map((exp)=>{
                        const bullets = parseBullets(exp.description);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        color: '#000'
                                                    },
                                                    children: exp.company
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this),
                                                exp.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 9,
                                                        color: '#666'
                                                    },
                                                    children: [
                                                        ", ",
                                                        exp.location
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 38
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#666',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 10,
                                        fontStyle: 'italic',
                                        color: '#444'
                                    },
                                    children: exp.position
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this),
                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        margin: '4px 0 0',
                                        paddingLeft: 16,
                                        fontSize: 9.5,
                                        color: '#333',
                                        lineHeight: 1.55
                                    },
                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                marginBottom: 1
                                            },
                                            children: b
                                        }, i, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 144,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 142,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, exp.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this),
            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            fontWeight: 600,
                            fontVariant: 'small-caps',
                            letterSpacing: '0.1em',
                            marginBottom: 6,
                            color: '#000'
                        },
                        children: "Education"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: '#000'
                                                },
                                                children: [
                                                    edu.degree,
                                                    edu.field ? ` in ${edu.field}` : ''
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 165,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#666',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(edu.startDate, edu.endDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9.5,
                                        color: '#555'
                                    },
                                    children: [
                                        edu.institution,
                                        edu.location ? `, ${edu.location}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this),
                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9,
                                        color: '#666'
                                    },
                                    children: [
                                        "GPA: ",
                                        edu.gpa
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 176,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, edu.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this),
            skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            fontWeight: 600,
                            fontVariant: 'small-caps',
                            letterSpacing: '0.1em',
                            marginBottom: 6,
                            color: '#000'
                        },
                        children: "Skills"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9.5,
                            color: '#333',
                            lineHeight: 1.6
                        },
                        children: skills.map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    skill.name,
                                    i < skills.length - 1 ? '  •  ' : ''
                                ]
                            }, skill.id, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 2. MODERN — "Contemporary Two-Column"
// Left sidebar (30%) with dark charcoal, right main area (70%)
// Emerald/teal accent, tech-industry feel
// ════════════════════════════════════════════════════════════════
function ModernTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accent = '#10b981';
    const sidebarBg = '#1a1a2e';
    const sidebarContact = [
        {
            label: 'Email',
            value: profile?.email
        },
        {
            label: 'Phone',
            value: profile?.phone
        },
        {
            label: 'Location',
            value: profile?.location
        },
        {
            label: 'Website',
            value: profile?.website
        },
        {
            label: 'LinkedIn',
            value: profile?.linkedin
        },
        {
            label: 'GitHub',
            value: profile?.github
        }
    ].filter((item)=>item.value);
    const skillsByCategory = skills.reduce((acc, skill)=>{
        const cat = skill.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});
    const categoryLabels = {
        technical: 'Technical',
        soft: 'Soft Skills',
        language: 'Languages',
        other: 'Other'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0,
            display: 'flex'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '30%',
                    background: sidebarBg,
                    color: '#e5e5e5',
                    padding: '15mm 6mm',
                    boxSizing: 'border-box',
                    minHeight: '297mm',
                    overflow: 'visible'
                },
                children: [
                    profile?.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: profile.image,
                        alt: "",
                        style: {
                            width: 64,
                            height: 80,
                            borderRadius: 4,
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            marginBottom: 14,
                            border: '2px solid rgba(255,255,255,0.2)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 64,
                            height: 80,
                            borderRadius: 4,
                            background: accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 14,
                            fontSize: 24,
                            fontWeight: 700,
                            color: 'white'
                        },
                        children: name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2)
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: 18,
                            fontWeight: 700,
                            color: 'white',
                            margin: '0 0 4px',
                            lineHeight: 1.2
                        },
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            color: accent,
                            fontWeight: 500,
                            marginBottom: 20
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this),
                    sidebarContact.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 22
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 9,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    color: accent,
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                    borderBottom: `1px solid ${accent}60`
                                },
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this),
                            sidebarContact.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 7,
                                        fontSize: 8.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#888',
                                                fontSize: 7.5,
                                                marginBottom: 1,
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            },
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 292,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#ccc',
                                                wordBreak: 'break-all',
                                                lineHeight: 1.4
                                            },
                                            children: item.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 295,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 291,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this),
                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 9,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    color: accent,
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                    borderBottom: `1px solid ${accent}60`
                                },
                                children: "Skills"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this),
                            Object.entries(skillsByCategory).map(([category, catSkills])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 7.5,
                                                color: '#888',
                                                marginBottom: 4,
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            },
                                            children: categoryLabels[category] || category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 4
                                            },
                                            children: catSkills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8,
                                                        background: 'rgba(255,255,255,0.08)',
                                                        padding: '3px 8px',
                                                        borderRadius: 10,
                                                        color: '#bbb',
                                                        border: `1px solid rgba(255,255,255,0.1)`
                                                    },
                                                    children: skill.name
                                                }, skill.id, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 316,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, category, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 312,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    padding: '15mm 10mm',
                    overflow: 'visible'
                },
                children: [
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 18
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 6,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accent}`,
                                    display: 'inline-block'
                                },
                                children: "Profile"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    color: '#444',
                                    margin: 0,
                                    lineHeight: 1.6
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, this),
                    experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 18
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accent}`,
                                    display: 'inline-block'
                                },
                                children: "Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, this),
                            experiences.map((exp, i)=>{
                                const bullets = parseBullets(exp.description);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: i < experiences.length - 1 ? 14 : 0,
                                        paddingLeft: 12,
                                        borderLeft: `3px solid ${accent}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8.5,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8
                                                    },
                                                    children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 369,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9.5,
                                                color: '#555',
                                                fontWeight: 500
                                            },
                                            children: [
                                                exp.company,
                                                exp.location ? `, ${exp.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 375,
                                            columnNumber: 19
                                        }, this),
                                        bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '4px 0 0',
                                                paddingLeft: 14,
                                                fontSize: 9.5,
                                                color: '#444',
                                                lineHeight: 1.55
                                            },
                                            children: bullets.map((b, bi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        marginBottom: 1
                                                    },
                                                    children: b
                                                }, bi, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 379,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 364,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this),
                    education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accent}`,
                                    display: 'inline-block'
                                },
                                children: "Education"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this),
                            education.map((edu, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: i < education.length - 1 ? 10 : 0,
                                        paddingLeft: 12,
                                        borderLeft: `3px solid ${accent}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: [
                                                        edu.degree,
                                                        edu.field ? ` in ${edu.field}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8.5,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8
                                                    },
                                                    children: dateRange(edu.startDate, edu.endDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 408,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9.5,
                                                color: '#555'
                                            },
                                            children: [
                                                edu.institution,
                                                edu.location ? `, ${edu.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 416,
                                            columnNumber: 17
                                        }, this),
                                        edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: '#666'
                                            },
                                            children: [
                                                "GPA: ",
                                                edu.gpa
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 419,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, edu.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 3. PROFESSIONAL — "Classic Corporate"
// Centered name with double lines, dark navy headers
// Traditional, conservative industries
// ════════════════════════════════════════════════════════════════
function ProfessionalTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const navy = '#1a365d';
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location
    ].filter(Boolean);
    const webItems = [
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    const allContact = [
        ...contactItems,
        ...webItems
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: a4Style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    marginBottom: 4
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: `2px solid ${navy}`,
                            marginBottom: 3
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 458,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: `1px solid ${navy}`,
                            marginBottom: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                            marginBottom: 4
                        },
                        children: [
                            profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.image,
                                alt: "",
                                style: {
                                    width: 48,
                                    height: 60,
                                    borderRadius: 4,
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    flexShrink: 0,
                                    border: '1.5px solid #d0d0d0'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 22,
                                    fontWeight: 700,
                                    letterSpacing: '0.04em',
                                    margin: 0,
                                    color: navy,
                                    textTransform: 'uppercase'
                                },
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 469,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 461,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: '#555',
                            fontWeight: 400,
                            marginBottom: 8
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 474,
                        columnNumber: 11
                    }, this),
                    allContact.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9,
                            color: '#555',
                            marginBottom: 6
                        },
                        children: allContact.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    item,
                                    i < allContact.length - 1 ? '  •  ' : ''
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 481,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 479,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: `1px solid ${navy}`,
                            marginBottom: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: `2px solid ${navy}`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 456,
                columnNumber: 7
            }, this),
            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    margin: '14px 0'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: navy,
                            marginBottom: 8,
                            textAlign: 'center'
                        },
                        children: "Professional Summary"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 494,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 500,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: '#333',
                            margin: 0,
                            lineHeight: 1.6,
                            textAlign: 'center'
                        },
                        children: profile.summary
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 493,
                columnNumber: 9
            }, this),
            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: navy,
                            marginBottom: 8,
                            textAlign: 'center'
                        },
                        children: "Professional Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 508,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this),
                    experiences.map((exp)=>{
                        const bullets = parseBullets(exp.description);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: '#111'
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: '#555',
                                                        marginLeft: 8
                                                    },
                                                    children: [
                                                        "— ",
                                                        exp.company,
                                                        exp.location ? `, ${exp.location}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 520,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#777',
                                                fontWeight: 500,
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 526,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 519,
                                    columnNumber: 17
                                }, this),
                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        margin: '4px 0 0',
                                        paddingLeft: 18,
                                        fontSize: 10,
                                        color: '#444',
                                        lineHeight: 1.6
                                    },
                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                marginBottom: 2,
                                                listStyleType: 'disc'
                                            },
                                            children: b
                                        }, i, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 533,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 531,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, exp.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 518,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 507,
                columnNumber: 9
            }, this),
            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: navy,
                            marginBottom: 8,
                            textAlign: 'center'
                        },
                        children: "Education"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 552,
                        columnNumber: 11
                    }, this),
                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 8,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: '#111'
                                            },
                                            children: [
                                                edu.degree,
                                                edu.field ? ` in ${edu.field}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 556,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10,
                                                color: '#555',
                                                marginLeft: 8
                                            },
                                            children: [
                                                "— ",
                                                edu.institution,
                                                edu.location ? `, ${edu.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 555,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 9,
                                        color: '#777',
                                        fontWeight: 500,
                                        flexShrink: 0,
                                        marginLeft: 8
                                    },
                                    children: dateRange(edu.startDate, edu.endDate)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 563,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, edu.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 554,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 545,
                columnNumber: 9
            }, this),
            skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: navy,
                            marginBottom: 8,
                            textAlign: 'center'
                        },
                        children: "Skills"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 574,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #ccc',
                            marginBottom: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 580,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px 10px',
                            justifyContent: 'center'
                        },
                        children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: '#444'
                                },
                                children: skill.name
                            }, skill.id, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 583,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 581,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 573,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 454,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 4. CREATIVE — "Design-Forward"
// Left accent bar (emerald), progress bars for skills
// Timeline dots for experience, emerald accent
// ════════════════════════════════════════════════════════════════
function CreativeTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accent = '#10b981';
    const contactItems = [
        {
            icon: '📧',
            value: profile?.email
        },
        {
            icon: '📞',
            value: profile?.phone
        },
        {
            icon: '📍',
            value: profile?.location
        },
        {
            icon: '🌐',
            value: profile?.website
        },
        {
            icon: '💼',
            value: profile?.linkedin
        },
        {
            icon: '💻',
            value: profile?.github
        }
    ].filter((item)=>item.value);
    // Deterministic skill levels based on skill name
    const skillLevels = {};
    skills.forEach((skill)=>{
        let hash = 0;
        for(let c = 0; c < skill.name.length; c++){
            hash = (hash << 5) - hash + skill.name.charCodeAt(c);
            hash |= 0;
        }
        skillLevels[skill.name] = 65 + Math.abs(hash) % 30; // 65-95
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0,
            display: 'flex'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 5,
                    background: accent,
                    flexShrink: 0,
                    minHeight: '297mm'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    padding: '14mm 14mm 14mm 12mm',
                    overflow: 'visible'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 18,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14
                        },
                        children: [
                            profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.image,
                                alt: "",
                                style: {
                                    width: 48,
                                    height: 60,
                                    borderRadius: 4,
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    flexShrink: 0,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 637,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: 22,
                                            fontWeight: 800,
                                            margin: '0 0 2px',
                                            color: '#111'
                                        },
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 644,
                                        columnNumber: 13
                                    }, this),
                                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            color: accent,
                                            fontWeight: 600,
                                            letterSpacing: '0.01em'
                                        },
                                        children: profile.jobTitle
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 651,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 643,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 635,
                        columnNumber: 9
                    }, this),
                    contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px 14px',
                            marginBottom: 16,
                            fontSize: 9
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    color: '#555'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10
                                        },
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 663,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 664,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 662,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 660,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: `2px solid ${accent}`,
                            marginBottom: 16
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 671,
                        columnNumber: 9
                    }, this),
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 6
                                },
                                children: "About Me"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 676,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    color: '#444',
                                    margin: 0,
                                    lineHeight: 1.6
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 682,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 675,
                        columnNumber: 11
                    }, this),
                    experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 10
                                },
                                children: "Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 689,
                                columnNumber: 13
                            }, this),
                            experiences.map((exp, i)=>{
                                const bullets = parseBullets(exp.description);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: i < experiences.length - 1 ? 14 : 0,
                                        position: 'relative',
                                        paddingLeft: 18
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 5,
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: accent,
                                                border: '2px solid white',
                                                boxShadow: `0 0 0 1px ${accent}`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 703,
                                            columnNumber: 19
                                        }, this),
                                        i < experiences.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                left: 3.5,
                                                top: 15,
                                                width: 1,
                                                height: 'calc(100% - 10px)',
                                                background: `${accent}40`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 711,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 718,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8.5,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8
                                                    },
                                                    children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 719,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 717,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9.5,
                                                color: '#666',
                                                fontWeight: 500
                                            },
                                            children: [
                                                exp.company,
                                                exp.location ? ` · ${exp.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 723,
                                            columnNumber: 19
                                        }, this),
                                        bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '4px 0 0',
                                                paddingLeft: 14,
                                                fontSize: 9.5,
                                                color: '#444',
                                                lineHeight: 1.55
                                            },
                                            children: bullets.map((b, bi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        marginBottom: 1
                                                    },
                                                    children: b
                                                }, bi, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 727,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 698,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 688,
                        columnNumber: 11
                    }, this),
                    education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 8
                                },
                                children: "Education"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 742,
                                columnNumber: 13
                            }, this),
                            education.map((edu, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: i < education.length - 1 ? 10 : 0,
                                        position: 'relative',
                                        paddingLeft: 18
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 5,
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: accent,
                                                border: '2px solid white',
                                                boxShadow: `0 0 0 1px ${accent}`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 753,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: [
                                                        edu.degree,
                                                        edu.field ? ` in ${edu.field}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 760,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8.5,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8
                                                    },
                                                    children: dateRange(edu.startDate, edu.endDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 763,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 759,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9.5,
                                                color: '#666'
                                            },
                                            children: [
                                                edu.institution,
                                                edu.location ? ` · ${edu.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 767,
                                            columnNumber: 17
                                        }, this),
                                        edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: '#666'
                                            },
                                            children: [
                                                "GPA: ",
                                                edu.gpa
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 770,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, edu.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 749,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 741,
                        columnNumber: 11
                    }, this),
                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: accent,
                                    marginBottom: 8
                                },
                                children: "Skills"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 779,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px 16px'
                                },
                                children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 'calc(50% - 8px)',
                                            minWidth: 120
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 9,
                                                    color: '#444',
                                                    marginBottom: 3,
                                                    fontWeight: 500
                                                },
                                                children: skill.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 788,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 5,
                                                    background: '#e5e7eb',
                                                    borderRadius: 3,
                                                    overflow: 'hidden'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: '100%',
                                                        width: `${skillLevels[skill.name] || 75}%`,
                                                        background: `linear-gradient(90deg, ${accent}, #34d399)`,
                                                        borderRadius: 3
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 790,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 789,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, skill.id, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 787,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 785,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 778,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 633,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 625,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 5. EXECUTIVE — "C-Suite Level"
// Dark banner at top with name in white
// Section headers with left border (3px emerald)
// Charcoal banner + emerald accents
// ════════════════════════════════════════════════════════════════
function ExecutiveTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accent = '#10b981';
    const charcoal = '#1f2937';
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: charcoal,
                    padding: '20mm 15mm 10mm',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14
                },
                children: [
                    profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: profile.image,
                        alt: "",
                        style: {
                            width: 52,
                            height: 65,
                            borderRadius: 4,
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            flexShrink: 0,
                            border: '2px solid rgba(255,255,255,0.3)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 839,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 26,
                                    fontWeight: 800,
                                    margin: '0 0 4px',
                                    color: 'white',
                                    letterSpacing: '-0.01em'
                                },
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 846,
                                columnNumber: 11
                            }, this),
                            profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    color: '#9ca3af',
                                    fontWeight: 400,
                                    letterSpacing: '0.02em'
                                },
                                children: profile.jobTitle
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 853,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 845,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 830,
                columnNumber: 7
            }, this),
            contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '6px 15mm',
                    fontSize: 9,
                    color: '#555',
                    borderBottom: `2px solid ${accent}`,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px 16px'
                },
                children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: item
                    }, i, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 869,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 862,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '8mm 15mm 15mm',
                    overflow: 'visible'
                },
                children: [
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: '#1f2937',
                                    marginBottom: 8,
                                    paddingLeft: 10,
                                    borderLeft: `3px solid ${accent}`
                                },
                                children: "Executive Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 879,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    color: '#333',
                                    margin: 0,
                                    lineHeight: 1.65,
                                    paddingLeft: 10
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 886,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 878,
                        columnNumber: 11
                    }, this),
                    experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: '#1f2937',
                                    marginBottom: 10,
                                    paddingLeft: 10,
                                    borderLeft: `3px solid ${accent}`
                                },
                                children: "Professional Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 893,
                                columnNumber: 13
                            }, this),
                            experiences.map((exp)=>{
                                const bullets = parseBullets(exp.description);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 14,
                                        paddingLeft: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        margin: 0,
                                                        color: '#111'
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 905,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 9,
                                                        color: '#777',
                                                        flexShrink: 0,
                                                        marginLeft: 8,
                                                        fontWeight: 500
                                                    },
                                                    children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 906,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 904,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 10,
                                                color: accent,
                                                fontWeight: 600,
                                                fontStyle: 'italic'
                                            },
                                            children: [
                                                exp.company,
                                                exp.location ? `, ${exp.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 910,
                                            columnNumber: 19
                                        }, this),
                                        bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '4px 0 0',
                                                paddingLeft: 16,
                                                fontSize: 9.5,
                                                color: '#444',
                                                lineHeight: 1.55
                                            },
                                            children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        marginBottom: 1
                                                    },
                                                    children: b
                                                }, i, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 916,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 914,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 903,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 892,
                        columnNumber: 11
                    }, this),
                    education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: '#1f2937',
                                    marginBottom: 8,
                                    paddingLeft: 10,
                                    borderLeft: `3px solid ${accent}`
                                },
                                children: "Education"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 929,
                                columnNumber: 13
                            }, this),
                            education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 8,
                                        paddingLeft: 10,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        color: '#111'
                                                    },
                                                    children: [
                                                        edu.degree,
                                                        edu.field ? ` in ${edu.field}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 939,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 9.5,
                                                        color: '#555',
                                                        marginLeft: 8
                                                    },
                                                    children: [
                                                        "— ",
                                                        edu.institution,
                                                        edu.location ? `, ${edu.location}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 938,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#777',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(edu.startDate, edu.endDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 946,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, edu.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 937,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 928,
                        columnNumber: 11
                    }, this),
                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: '#1f2937',
                                    marginBottom: 8,
                                    paddingLeft: 10,
                                    borderLeft: `3px solid ${accent}`
                                },
                                children: "Core Competencies"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 957,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '4px 6px',
                                    paddingLeft: 10
                                },
                                children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 9,
                                            color: '#333',
                                            background: '#f3f4f6',
                                            padding: '3px 10px',
                                            borderRadius: 2,
                                            border: '1px solid #e5e7eb'
                                        },
                                        children: skill.name
                                    }, skill.id, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 966,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 964,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 956,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 875,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 828,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 6. COMPACT — "Maximum Content"
// Two-column throughout, 9-10pt, name left + contact right
// Skills comma-separated, company+position same line
// Gray and black only
// ════════════════════════════════════════════════════════════════
function CompactTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: '10mm 12mm',
            fontSize: 9,
            lineHeight: 1.4
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1.5px solid #333',
                    paddingBottom: 4,
                    marginBottom: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.image,
                                alt: "",
                                style: {
                                    width: 38,
                                    height: 48,
                                    borderRadius: 3,
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    flexShrink: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1006,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 700,
                                    margin: 0,
                                    letterSpacing: '-0.01em',
                                    color: '#000'
                                },
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1012,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1004,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 7.5,
                            color: '#666',
                            textAlign: 'right',
                            lineHeight: 1.5,
                            maxWidth: '55%'
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    item,
                                    i < contactItems.length - 1 ? '  •  ' : ''
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1018,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1016,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1003,
                columnNumber: 7
            }, this),
            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            marginBottom: 3,
                            color: '#000'
                        },
                        children: "Summary"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1026,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 8.5,
                            color: '#444',
                            margin: 0,
                            lineHeight: 1.5
                        },
                        children: profile.summary
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1029,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1025,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 3
                        },
                        children: [
                            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 9,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            borderBottom: '0.5px solid #999',
                                            paddingBottom: 2,
                                            marginBottom: 4,
                                            color: '#000'
                                        },
                                        children: "Experience"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1040,
                                        columnNumber: 15
                                    }, this),
                                    experiences.map((exp)=>{
                                        const bullets = parseBullets(exp.description);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'baseline'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: 600,
                                                                fontSize: 9,
                                                                color: '#000'
                                                            },
                                                            children: [
                                                                exp.position,
                                                                exp.company ? `, ${exp.company}` : '',
                                                                exp.location ? ` — ${exp.location}` : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1048,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 7.5,
                                                                color: '#888',
                                                                flexShrink: 0,
                                                                marginLeft: 6
                                                            },
                                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1051,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 21
                                                }, this),
                                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    style: {
                                                        margin: '2px 0 0',
                                                        paddingLeft: 12,
                                                        fontSize: 8,
                                                        color: '#444',
                                                        lineHeight: 1.45
                                                    },
                                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            style: {
                                                                marginBottom: 0
                                                            },
                                                            children: b
                                                        }, i, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1058,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1056,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, exp.id, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1046,
                                            columnNumber: 19
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1039,
                                columnNumber: 13
                            }, this),
                            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 9,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            borderBottom: '0.5px solid #999',
                                            paddingBottom: 2,
                                            marginBottom: 4,
                                            color: '#000'
                                        },
                                        children: "Education"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 15
                                    }, this),
                                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'baseline'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontWeight: 600,
                                                                fontSize: 9,
                                                                color: '#000'
                                                            },
                                                            children: [
                                                                edu.degree,
                                                                edu.field ? ` in ${edu.field}` : '',
                                                                edu.institution ? `, ${edu.institution}` : '',
                                                                edu.location ? ` — ${edu.location}` : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1077,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 7.5,
                                                                color: '#888',
                                                                flexShrink: 0,
                                                                marginLeft: 6
                                                            },
                                                            children: dateRange(edu.startDate, edu.endDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1076,
                                                    columnNumber: 19
                                                }, this),
                                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 7.5,
                                                        color: '#666'
                                                    },
                                                    children: [
                                                        "GPA: ",
                                                        edu.gpa
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1084,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, edu.id, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1070,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1036,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9,
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        borderBottom: '0.5px solid #999',
                                        paddingBottom: 2,
                                        marginBottom: 4,
                                        color: '#000'
                                    },
                                    children: "Skills"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1095,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 8,
                                        color: '#444',
                                        lineHeight: 1.6
                                    },
                                    children: skills.map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                skill.name,
                                                i < skills.length - 1 ? ', ' : ''
                                            ]
                                        }, skill.id, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1100,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1098,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 1094,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1092,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1034,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 1001,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 7. ELEGANT — "Timeless Sophistication"
// Single column, serif headings, double-line borders, centered name
// Deep navy headings, italic company names
// ════════════════════════════════════════════════════════════════
function ElegantTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const navy = '#1e3a5f';
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    const sectionHeaderStyle = {
        fontSize: 10,
        fontWeight: 600,
        fontVariant: 'small-caps',
        letterSpacing: '0.12em',
        color: navy,
        marginBottom: 4,
        paddingBottom: 3,
        borderBottom: '0.5px solid #1e3a5f40',
        display: 'inline-block'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            fontFamily: 'Inter, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1.5px solid #1e3a5f30',
                    marginBottom: 2
                }
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '0.5px solid #1e3a5f20',
                    marginBottom: 16
                }
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    marginBottom: 20
                },
                children: [
                    profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: profile.image,
                        alt: "",
                        style: {
                            width: 52,
                            height: 65,
                            borderRadius: 4,
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            marginBottom: 10,
                            border: '1.5px solid #1e3a5f30'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1153,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: 24,
                            fontWeight: 400,
                            margin: '0 0 6px',
                            color: navy,
                            fontFamily: 'Georgia, serif',
                            letterSpacing: '0.03em'
                        },
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1159,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: '#555',
                            fontWeight: 400,
                            marginBottom: 8,
                            letterSpacing: '0.02em'
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1166,
                        columnNumber: 11
                    }, this),
                    contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9,
                            color: '#666',
                            letterSpacing: '0.02em'
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    item,
                                    i < contactItems.length - 1 ? '  ·  ' : ''
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1173,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1171,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1151,
                columnNumber: 7
            }, this),
            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Summary"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1184,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: '#444',
                            margin: '6px 0 0',
                            lineHeight: 1.65
                        },
                        children: profile.summary
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1183,
                columnNumber: 9
            }, this),
            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1192,
                        columnNumber: 11
                    }, this),
                    experiences.map((exp)=>{
                        const bullets = parseBullets(exp.description);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    color: '#222'
                                                },
                                                children: exp.position
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 1199,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1198,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#888',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1197,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 10,
                                        fontStyle: 'italic',
                                        color: navy,
                                        fontWeight: 500
                                    },
                                    children: [
                                        exp.company,
                                        exp.location ? `, ${exp.location}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1205,
                                    columnNumber: 17
                                }, this),
                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        margin: '4px 0 0',
                                        paddingLeft: 16,
                                        fontSize: 9.5,
                                        color: '#444',
                                        lineHeight: 1.55
                                    },
                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                marginBottom: 1
                                            },
                                            children: b
                                        }, i, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1211,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1209,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, exp.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 1196,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1191,
                columnNumber: 9
            }, this),
            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Education"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1224,
                        columnNumber: 11
                    }, this),
                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    color: '#222'
                                                },
                                                children: [
                                                    edu.degree,
                                                    edu.field ? ` in ${edu.field}` : ''
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 1229,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1228,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#888',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(edu.startDate, edu.endDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1227,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9.5,
                                        color: '#555'
                                    },
                                    children: [
                                        edu.institution,
                                        edu.location ? `, ${edu.location}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1237,
                                    columnNumber: 15
                                }, this),
                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9,
                                        color: '#777'
                                    },
                                    children: [
                                        "GPA: ",
                                        edu.gpa
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1240,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, edu.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 1226,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1223,
                columnNumber: 9
            }, this),
            skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Skills"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1249,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9.5,
                            color: '#444',
                            lineHeight: 1.7,
                            marginTop: 6
                        },
                        children: skills.map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    skill.name,
                                    i < skills.length - 1 ? '  •  ' : ''
                                ]
                            }, skill.id, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1252,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1250,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1248,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '0.5px solid #1e3a5f20',
                            marginBottom: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderTop: '1.5px solid #1e3a5f30'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1261,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 1145,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 8. TECHNICAL — "Developer Focused"
// Two-column: left sidebar (30%) dark navy, right (70%) white
// Monospace name, emoji icons, colored skill pills, code-style headers
// ════════════════════════════════════════════════════════════════
function TechnicalTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const sidebarBg = '#0f172a';
    const accent = '#10b981';
    const contactWithIcons = [
        {
            icon: '📧',
            value: profile?.email,
            label: 'Email'
        },
        {
            icon: '📱',
            value: profile?.phone,
            label: 'Phone'
        },
        {
            icon: '🌐',
            value: profile?.website,
            label: 'Website'
        },
        {
            icon: '💼',
            value: profile?.linkedin,
            label: 'LinkedIn'
        },
        {
            icon: '🐙',
            value: profile?.github,
            label: 'GitHub'
        },
        {
            icon: '📍',
            value: profile?.location,
            label: 'Location'
        }
    ].filter((item)=>item.value);
    const skillsByCategory = skills.reduce((acc, skill)=>{
        const cat = skill.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});
    const categoryColors = {
        technical: {
            bg: '#065f46',
            text: '#6ee7b7'
        },
        soft: {
            bg: '#1e3a5f',
            text: '#93c5fd'
        },
        language: {
            bg: '#581c87',
            text: '#d8b4fe'
        },
        other: {
            bg: '#374151',
            text: '#9ca3af'
        }
    };
    const categoryLabels = {
        technical: 'Technical',
        soft: 'Soft Skills',
        language: 'Languages',
        other: 'Other'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0,
            display: 'flex'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '30%',
                    background: sidebarBg,
                    color: '#e5e5e5',
                    padding: '15mm 6mm',
                    boxSizing: 'border-box',
                    minHeight: '297mm',
                    overflow: 'visible'
                },
                children: [
                    profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: profile.image,
                        alt: "",
                        style: {
                            width: 60,
                            height: 75,
                            borderRadius: 4,
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            marginBottom: 14,
                            border: '2px solid rgba(255,255,255,0.15)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1324,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: 18,
                            fontWeight: 700,
                            color: 'white',
                            fontFamily: "'Courier New', Courier, monospace",
                            margin: '0 0 4px',
                            lineHeight: 1.2
                        },
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1332,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9,
                            color: accent,
                            fontWeight: 500,
                            fontFamily: "'Courier New', Courier, monospace",
                            marginBottom: 20
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1340,
                        columnNumber: 11
                    }, this),
                    contactWithIcons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 22
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 9,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    color: accent,
                                    marginBottom: 10,
                                    fontFamily: "'Courier New', Courier, monospace"
                                },
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1352,
                                columnNumber: 13
                            }, this),
                            contactWithIcons.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 6,
                                        fontSize: 8.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10
                                            },
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1361,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#ccc',
                                                wordBreak: 'break-all',
                                                lineHeight: 1.4
                                            },
                                            children: item.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1362,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1360,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1351,
                        columnNumber: 11
                    }, this),
                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 9,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    color: accent,
                                    marginBottom: 10,
                                    fontFamily: "'Courier New', Courier, monospace"
                                },
                                children: "Skills"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1371,
                                columnNumber: 13
                            }, this),
                            Object.entries(skillsByCategory).map(([category, catSkills])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 7.5,
                                                color: '#94a3b8',
                                                marginBottom: 4,
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            },
                                            children: categoryLabels[category] || category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1380,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 4
                                            },
                                            children: catSkills.map((skill)=>{
                                                const colors = categoryColors[category] || categoryColors.other;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8,
                                                        background: colors.bg,
                                                        padding: '3px 8px',
                                                        borderRadius: 10,
                                                        color: colors.text,
                                                        border: `1px solid ${colors.text}30`
                                                    },
                                                    children: skill.name
                                                }, skill.id, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1387,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1383,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, category, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1379,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1370,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    padding: '15mm 10mm',
                    overflow: 'visible'
                },
                children: [
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 18
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: accent,
                                    fontFamily: "'Courier New', Courier, monospace",
                                    marginBottom: 6,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accent}`,
                                    display: 'inline-block'
                                },
                                children: "## Profile"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1408,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    color: '#444',
                                    margin: 0,
                                    lineHeight: 1.6
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1417,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1407,
                        columnNumber: 11
                    }, this),
                    experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 18
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: accent,
                                    fontFamily: "'Courier New', Courier, monospace",
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accent}`,
                                    display: 'inline-block'
                                },
                                children: "## Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1424,
                                columnNumber: 13
                            }, this),
                            experiences.map((exp, i)=>{
                                const bullets = parseBullets(exp.description);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: i < experiences.length - 1 ? 14 : 0,
                                        paddingLeft: 12,
                                        borderLeft: `3px solid ${accent}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1442,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8.5,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8,
                                                        fontFamily: "'Courier New', Courier, monospace"
                                                    },
                                                    children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1443,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1441,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9.5,
                                                color: '#555',
                                                fontWeight: 500
                                            },
                                            children: [
                                                exp.company,
                                                exp.location ? `, ${exp.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1447,
                                            columnNumber: 19
                                        }, this),
                                        bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '4px 0 0',
                                                paddingLeft: 14,
                                                fontSize: 9.5,
                                                color: '#444',
                                                lineHeight: 1.55
                                            },
                                            children: bullets.map((b, bi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        marginBottom: 1
                                                    },
                                                    children: b
                                                }, bi, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1453,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1451,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1436,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1423,
                        columnNumber: 11
                    }, this),
                    education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: accent,
                                    fontFamily: "'Courier New', Courier, monospace",
                                    marginBottom: 10,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accent}`,
                                    display: 'inline-block'
                                },
                                children: "## Education"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1466,
                                columnNumber: 13
                            }, this),
                            education.map((edu, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: i < education.length - 1 ? 10 : 0,
                                        paddingLeft: 12,
                                        borderLeft: `3px solid ${accent}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        margin: 0
                                                    },
                                                    children: [
                                                        edu.degree,
                                                        edu.field ? ` in ${edu.field}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1482,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8.5,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8,
                                                        fontFamily: "'Courier New', Courier, monospace"
                                                    },
                                                    children: dateRange(edu.startDate, edu.endDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1485,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1481,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9.5,
                                                color: '#555'
                                            },
                                            children: [
                                                edu.institution,
                                                edu.location ? `, ${edu.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1489,
                                            columnNumber: 17
                                        }, this),
                                        edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: '#666'
                                            },
                                            children: [
                                                "GPA: ",
                                                edu.gpa
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1492,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, edu.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1476,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1465,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1404,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 1311,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 9. ACADEMIC — "Research & Education"
// Single column, traditional academic CV
// Education FIRST, pure black and white, serif headings, dense
// ════════════════════════════════════════════════════════════════
function AcademicTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    const sectionHeaderStyle = {
        fontSize: 10,
        fontWeight: 700,
        fontVariant: 'small-caps',
        letterSpacing: '0.1em',
        color: '#000',
        marginBottom: 4,
        paddingBottom: 2,
        borderBottom: '0.5px solid #000'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: '12mm 15mm',
            fontFamily: 'Inter, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    marginBottom: 14
                },
                children: [
                    profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: profile.image,
                        alt: "",
                        style: {
                            width: 48,
                            height: 60,
                            borderRadius: 3,
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            marginBottom: 8,
                            border: '1px solid #ccc'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1536,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: 20,
                            fontWeight: 400,
                            margin: '0 0 4px',
                            color: '#000',
                            fontFamily: 'Georgia, Times New Roman, serif',
                            letterSpacing: '0.02em'
                        },
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1542,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            color: '#333',
                            fontWeight: 400,
                            marginBottom: 4
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1549,
                        columnNumber: 11
                    }, this),
                    contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9,
                            color: '#333'
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    item,
                                    i < contactItems.length - 1 ? '  •  ' : ''
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1556,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1554,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1534,
                columnNumber: 7
            }, this),
            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Research Interests"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1565,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: '#222',
                            margin: '4px 0 0',
                            lineHeight: 1.5
                        },
                        children: profile.summary
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1566,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1564,
                columnNumber: 9
            }, this),
            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Education"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1573,
                        columnNumber: 11
                    }, this),
                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: '#000'
                                            },
                                            children: [
                                                edu.degree,
                                                edu.field ? ` in ${edu.field}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1577,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#333',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(edu.startDate, edu.endDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1580,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1576,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9.5,
                                        color: '#333'
                                    },
                                    children: [
                                        edu.institution,
                                        edu.location ? `, ${edu.location}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1584,
                                    columnNumber: 15
                                }, this),
                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 9,
                                        color: '#333'
                                    },
                                    children: [
                                        " — GPA: ",
                                        edu.gpa
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1587,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, edu.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 1575,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1572,
                columnNumber: 9
            }, this),
            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1596,
                        columnNumber: 11
                    }, this),
                    experiences.map((exp)=>{
                        const bullets = parseBullets(exp.description);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: '#000'
                                            },
                                            children: exp.position
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1602,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                color: '#333',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1603,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1601,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9.5,
                                        fontStyle: 'italic',
                                        color: '#222'
                                    },
                                    children: [
                                        exp.company,
                                        exp.location ? `, ${exp.location}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1607,
                                    columnNumber: 17
                                }, this),
                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        margin: '3px 0 0',
                                        paddingLeft: 16,
                                        fontSize: 9.5,
                                        color: '#222',
                                        lineHeight: 1.45
                                    },
                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                marginBottom: 0
                                            },
                                            children: b
                                        }, i, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1613,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1611,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, exp.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 1600,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1595,
                columnNumber: 9
            }, this),
            skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Skills"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1626,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 9.5,
                            color: '#222',
                            lineHeight: 1.5
                        },
                        children: skills.map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    skill.name,
                                    i < skills.length - 1 ? ', ' : ''
                                ]
                            }, skill.id, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1629,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1627,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1625,
                columnNumber: 9
            }, this),
            profile?.hobbies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionHeaderStyle,
                        children: "Awards & Interests"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1640,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 9.5,
                            color: '#222',
                            margin: '4px 0 0',
                            lineHeight: 1.5
                        },
                        children: profile.hobbies
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1641,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1639,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 1532,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 10. BOLD — "Stand Out"
// Vibrant gradient header banner (emerald → amber)
// Two-column below: left 65% (Experience, Education), right 35% (Contact, Skills, Hobbies)
// Colored left borders on sections, rounded skill tags
// ════════════════════════════════════════════════════════════════
function BoldTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const gradientFrom = '#10b981';
    const gradientTo = '#f59e0b';
    const contactWithIcons = [
        {
            icon: '📧',
            value: profile?.email
        },
        {
            icon: '📱',
            value: profile?.phone
        },
        {
            icon: '📍',
            value: profile?.location
        },
        {
            icon: '🌐',
            value: profile?.website
        },
        {
            icon: '💼',
            value: profile?.linkedin
        },
        {
            icon: '🐙',
            value: profile?.github
        }
    ].filter((item)=>item.value);
    const skillsByCategory = skills.reduce((acc, skill)=>{
        const cat = skill.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});
    const categoryColors = {
        technical: '#10b981',
        soft: '#f59e0b',
        language: '#8b5cf6',
        other: '#6b7280'
    };
    const categoryLabels = {
        technical: 'Technical',
        soft: 'Soft Skills',
        language: 'Languages',
        other: 'Other'
    };
    const sectionHeaderStyle = (color)=>({
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#1f2937',
            marginBottom: 8,
            paddingLeft: 10,
            borderLeft: `3px solid ${color}`
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    padding: '20mm 15mm 12mm',
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14
                        },
                        children: [
                            profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.image,
                                alt: "",
                                style: {
                                    width: 52,
                                    height: 65,
                                    borderRadius: 4,
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    flexShrink: 0,
                                    border: '2px solid rgba(255,255,255,0.3)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1711,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 28,
                                        fontWeight: 800,
                                        margin: '0 0 4px',
                                        color: 'white',
                                        letterSpacing: '-0.01em'
                                    },
                                    children: name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1718,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1717,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1709,
                        columnNumber: 9
                    }, this),
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: 'rgba(255,255,255,0.9)',
                            fontWeight: 400,
                            letterSpacing: '0.02em'
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1727,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1704,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '8mm 15mm 15mm',
                    display: 'flex',
                    gap: 20,
                    overflow: 'visible'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 65
                        },
                        children: [
                            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionHeaderStyle(gradientFrom),
                                        children: "Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1740,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 10,
                                            color: '#444',
                                            margin: 0,
                                            lineHeight: 1.65,
                                            paddingLeft: 10
                                        },
                                        children: profile.summary
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1741,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1739,
                                columnNumber: 13
                            }, this),
                            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionHeaderStyle(gradientFrom),
                                        children: "Experience"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1748,
                                        columnNumber: 15
                                    }, this),
                                    experiences.map((exp)=>{
                                        const bullets = parseBullets(exp.description);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 12,
                                                paddingLeft: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'baseline'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                margin: 0,
                                                                color: '#111'
                                                            },
                                                            children: exp.position
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1754,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 8.5,
                                                                color: '#888',
                                                                flexShrink: 0,
                                                                marginLeft: 8
                                                            },
                                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1755,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1753,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: '#555',
                                                        fontWeight: 500
                                                    },
                                                    children: [
                                                        exp.company,
                                                        exp.location ? `, ${exp.location}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1759,
                                                    columnNumber: 21
                                                }, this),
                                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    style: {
                                                        margin: '4px 0 0',
                                                        paddingLeft: 14,
                                                        fontSize: 9.5,
                                                        color: '#444',
                                                        lineHeight: 1.55
                                                    },
                                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            style: {
                                                                marginBottom: 1
                                                            },
                                                            children: b
                                                        }, i, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1765,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1763,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, exp.id, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1752,
                                            columnNumber: 19
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1747,
                                columnNumber: 13
                            }, this),
                            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionHeaderStyle(gradientTo),
                                        children: "Education"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1778,
                                        columnNumber: 15
                                    }, this),
                                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 8,
                                                paddingLeft: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'baseline'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 10,
                                                                fontWeight: 700,
                                                                color: '#111'
                                                            },
                                                            children: [
                                                                edu.degree,
                                                                edu.field ? ` in ${edu.field}` : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1782,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 8.5,
                                                                color: '#888',
                                                                flexShrink: 0,
                                                                marginLeft: 8
                                                            },
                                                            children: dateRange(edu.startDate, edu.endDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 1785,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1781,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9.5,
                                                        color: '#555'
                                                    },
                                                    children: [
                                                        edu.institution,
                                                        edu.location ? `, ${edu.location}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1789,
                                                    columnNumber: 19
                                                }, this),
                                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9,
                                                        color: '#666'
                                                    },
                                                    children: [
                                                        "GPA: ",
                                                        edu.gpa
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1792,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, edu.id, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1780,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1777,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1736,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 35,
                            minWidth: 0
                        },
                        children: [
                            contactWithIcons.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionHeaderStyle(gradientFrom),
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1804,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            paddingLeft: 10
                                        },
                                        children: contactWithIcons.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 5,
                                                    fontSize: 9,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    color: '#444'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 10
                                                        },
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 1808,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            wordBreak: 'break-all',
                                                            lineHeight: 1.4
                                                        },
                                                        children: item.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 1809,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 1807,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1805,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1803,
                                columnNumber: 13
                            }, this),
                            skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionHeaderStyle(gradientTo),
                                        children: "Skills"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1819,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            paddingLeft: 10
                                        },
                                        children: Object.entries(skillsByCategory).map(([category, catSkills])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 8,
                                                            color: '#888',
                                                            marginBottom: 3,
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: categoryLabels[category] || category
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 1823,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: 4
                                                        },
                                                        children: catSkills.map((skill)=>{
                                                            const color = categoryColors[category] || categoryColors.other;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 8,
                                                                    background: `${color}18`,
                                                                    padding: '3px 8px',
                                                                    borderRadius: 12,
                                                                    color: color,
                                                                    border: `1px solid ${color}40`,
                                                                    fontWeight: 500
                                                                },
                                                                children: skill.name
                                                            }, skill.id, false, {
                                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                                lineNumber: 1830,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 1826,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, category, true, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 1822,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1820,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1818,
                                columnNumber: 13
                            }, this),
                            profile?.hobbies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionHeaderStyle(gradientFrom),
                                        children: "Hobbies"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1850,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 9,
                                            color: '#555',
                                            margin: 0,
                                            lineHeight: 1.6,
                                            paddingLeft: 10
                                        },
                                        children: profile.hobbies
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1851,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1849,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1800,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1734,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 1702,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 11. SWISS — "Swiss Design"
// Clean grid-based layout with thick left accent bar and geometric structure
// ════════════════════════════════════════════════════════════════
function SwissTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accentColor = '#dc2626';
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0,
            display: 'flex',
            overflow: 'visible'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 8,
                    background: accentColor,
                    flexShrink: 0
                }
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1881,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    padding: '12mm 15mm 15mm'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    marginBottom: 4
                                },
                                children: [
                                    profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: profile.image,
                                        alt: "",
                                        style: {
                                            width: 48,
                                            height: 60,
                                            borderRadius: 4,
                                            objectFit: 'cover',
                                            objectPosition: 'center top',
                                            flexShrink: 0,
                                            border: '1.5px solid #d0d0d0'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1889,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    fontSize: 24,
                                                    fontWeight: 800,
                                                    letterSpacing: '-0.03em',
                                                    margin: 0,
                                                    color: accentColor,
                                                    textTransform: 'uppercase'
                                                },
                                                children: name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 1892,
                                                columnNumber: 15
                                            }, this),
                                            profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: '#444',
                                                    fontWeight: 400,
                                                    letterSpacing: '0.05em',
                                                    textTransform: 'uppercase'
                                                },
                                                children: profile.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 1896,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1891,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1887,
                                columnNumber: 11
                            }, this),
                            contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 8.5,
                                    color: '#555',
                                    letterSpacing: '0.03em',
                                    marginTop: 6
                                },
                                children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            item,
                                            i < contactItems.length - 1 ? '  ·  ' : ''
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1905,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1903,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 3,
                                    background: accentColor,
                                    marginTop: 12
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1909,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1886,
                        columnNumber: 9
                    }, this),
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    marginBottom: 6,
                                    color: '#111'
                                },
                                children: "Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1915,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 9.5,
                                    color: '#333',
                                    margin: 0,
                                    lineHeight: 1.65
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1918,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1914,
                        columnNumber: 11
                    }, this),
                    experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    marginBottom: 8,
                                    color: '#111'
                                },
                                children: "Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1925,
                                columnNumber: 13
                            }, this),
                            experiences.map((exp)=>{
                                const bullets = parseBullets(exp.description);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 10,
                                        paddingLeft: 10,
                                        borderLeft: `2px solid ${accentColor}30`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        margin: 0,
                                                        color: '#111'
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1933,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8
                                                    },
                                                    children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1934,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1932,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: accentColor,
                                                fontWeight: 600
                                            },
                                            children: [
                                                exp.company,
                                                exp.location ? ` · ${exp.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1938,
                                            columnNumber: 19
                                        }, this),
                                        bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '3px 0 0',
                                                paddingLeft: 14,
                                                fontSize: 9,
                                                color: '#444',
                                                lineHeight: 1.5
                                            },
                                            children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        marginBottom: 1
                                                    },
                                                    children: b
                                                }, i, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1943,
                                                    columnNumber: 46
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1942,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1931,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1924,
                        columnNumber: 11
                    }, this),
                    education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    marginBottom: 8,
                                    color: '#111'
                                },
                                children: "Education"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1955,
                                columnNumber: 13
                            }, this),
                            education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 6,
                                        paddingLeft: 10,
                                        borderLeft: `2px solid ${accentColor}30`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        color: '#111'
                                                    },
                                                    children: [
                                                        edu.degree,
                                                        edu.field ? ` in ${edu.field}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1961,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8,
                                                        color: '#888',
                                                        flexShrink: 0,
                                                        marginLeft: 8
                                                    },
                                                    children: dateRange(edu.startDate, edu.endDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 1964,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1960,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: accentColor,
                                                fontWeight: 500
                                            },
                                            children: edu.institution
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1968,
                                            columnNumber: 17
                                        }, this),
                                        edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 8.5,
                                                color: '#666'
                                            },
                                            children: [
                                                "GPA: ",
                                                edu.gpa
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 1969,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, edu.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 1959,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1954,
                        columnNumber: 11
                    }, this),
                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    marginBottom: 8,
                                    color: '#111'
                                },
                                children: "Skills"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1978,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 5
                                },
                                children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 8.5,
                                            background: `${accentColor}10`,
                                            padding: '3px 10px',
                                            borderRadius: 2,
                                            color: '#333',
                                            fontWeight: 500,
                                            borderLeft: `2px solid ${accentColor}`
                                        },
                                        children: skill.name
                                    }, skill.id, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 1983,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1981,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1977,
                        columnNumber: 11
                    }, this),
                    profile?.hobbies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    marginBottom: 6,
                                    color: '#111'
                                },
                                children: "Interests"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 1997,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 9,
                                    color: '#555',
                                    margin: 0,
                                    lineHeight: 1.6
                                },
                                children: profile.hobbies
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2000,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 1996,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 1884,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 1879,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 12. CORPORATE — "Corporate Blue"
// Traditional corporate style with teal accents and structured sections
// ════════════════════════════════════════════════════════════════
function CorporateTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accentColor = '#0d9488';
    const contactItems = [
        {
            label: 'Email',
            value: profile?.email
        },
        {
            label: 'Phone',
            value: profile?.phone
        },
        {
            label: 'Location',
            value: profile?.location
        },
        {
            label: 'Web',
            value: profile?.website
        },
        {
            label: 'LinkedIn',
            value: profile?.linkedin
        },
        {
            label: 'GitHub',
            value: profile?.github
        }
    ].filter((item)=>item.value);
    const skillsByCategory = skills.reduce((acc, skill)=>{
        const cat = skill.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0,
            overflow: 'visible'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: accentColor,
                    padding: '14mm 15mm 10mm',
                    color: 'white'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14
                    },
                    children: [
                        profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: profile.image,
                            alt: "",
                            style: {
                                width: 48,
                                height: 60,
                                borderRadius: 4,
                                objectFit: 'cover',
                                objectPosition: 'center top',
                                flexShrink: 0,
                                border: '2px solid rgba(255,255,255,0.4)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 2038,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: 22,
                                        fontWeight: 700,
                                        margin: 0,
                                        color: 'white',
                                        letterSpacing: '-0.01em'
                                    },
                                    children: name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2041,
                                    columnNumber: 13
                                }, this),
                                profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 11,
                                        color: 'rgba(255,255,255,0.85)',
                                        fontWeight: 400,
                                        marginTop: 2
                                    },
                                    children: profile.jobTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2043,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 2040,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/resume-templates.tsx",
                    lineNumber: 2036,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2035,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '8mm 15mm 15mm'
                },
                children: [
                    contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 12,
                            marginBottom: 16,
                            padding: '8px 12px',
                            background: '#f8fafc',
                            borderRadius: 4,
                            border: '1px solid #e2e8f0'
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 8.5,
                                    color: '#444'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 600,
                                            color: accentColor
                                        },
                                        children: [
                                            item.label,
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2055,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            wordBreak: 'break-all'
                                        },
                                        children: item.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2056,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2054,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2052,
                        columnNumber: 11
                    }, this),
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: accentColor,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: 6,
                                    paddingBottom: 4,
                                    borderBottom: `2px solid ${accentColor}30`
                                },
                                children: "Professional Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2065,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 9.5,
                                    color: '#333',
                                    margin: 0,
                                    lineHeight: 1.65
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2068,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2064,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: accentColor,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                marginBottom: 8,
                                                paddingBottom: 4,
                                                borderBottom: `2px solid ${accentColor}30`
                                            },
                                            children: "Work Experience"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2078,
                                            columnNumber: 17
                                        }, this),
                                        experiences.map((exp)=>{
                                            const bullets = parseBullets(exp.description);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'baseline'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 700,
                                                                    margin: 0,
                                                                    color: '#111'
                                                                },
                                                                children: exp.position
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                                lineNumber: 2086,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 8,
                                                                    color: '#888',
                                                                    flexShrink: 0,
                                                                    marginLeft: 8
                                                                },
                                                                children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                                lineNumber: 2087,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 2085,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 9,
                                                            color: accentColor,
                                                            fontWeight: 600
                                                        },
                                                        children: [
                                                            exp.company,
                                                            exp.location ? ` · ${exp.location}` : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 2091,
                                                        columnNumber: 23
                                                    }, this),
                                                    bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        style: {
                                                            margin: '3px 0 0',
                                                            paddingLeft: 14,
                                                            fontSize: 9,
                                                            color: '#444',
                                                            lineHeight: 1.5
                                                        },
                                                        children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                style: {
                                                                    marginBottom: 1
                                                                },
                                                                children: b
                                                            }, i, false, {
                                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                                lineNumber: 2096,
                                                                columnNumber: 50
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/resume-templates.tsx",
                                                        lineNumber: 2095,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, exp.id, true, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2084,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2077,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2075,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '35%',
                                    minWidth: 0
                                },
                                children: [
                                    education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: accentColor,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.08em',
                                                    marginBottom: 8,
                                                    paddingBottom: 4,
                                                    borderBottom: `2px solid ${accentColor}30`
                                                },
                                                children: "Education"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2110,
                                                columnNumber: 17
                                            }, this),
                                            education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 9.5,
                                                                fontWeight: 700,
                                                                color: '#111'
                                                            },
                                                            children: [
                                                                edu.degree,
                                                                edu.field ? ` in ${edu.field}` : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 2115,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 9,
                                                                color: '#555'
                                                            },
                                                            children: edu.institution
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 2118,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 8,
                                                                color: '#888'
                                                            },
                                                            children: dateRange(edu.startDate, edu.endDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 2119,
                                                            columnNumber: 21
                                                        }, this),
                                                        edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 8,
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                "GPA: ",
                                                                edu.gpa
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 2120,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, edu.id, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2114,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2109,
                                        columnNumber: 15
                                    }, this),
                                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: accentColor,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.08em',
                                                    marginBottom: 8,
                                                    paddingBottom: 4,
                                                    borderBottom: `2px solid ${accentColor}30`
                                                },
                                                children: "Skills"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2128,
                                                columnNumber: 17
                                            }, this),
                                            Object.entries(skillsByCategory).map(([category, catSkills])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 8,
                                                                color: '#888',
                                                                fontWeight: 600,
                                                                textTransform: 'uppercase',
                                                                marginBottom: 3
                                                            },
                                                            children: category
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 2133,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                gap: 3
                                                            },
                                                            children: catSkills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 8,
                                                                        background: `${accentColor}12`,
                                                                        padding: '2px 8px',
                                                                        borderRadius: 10,
                                                                        color: '#333',
                                                                        fontWeight: 500
                                                                    },
                                                                    children: skill.name
                                                                }, skill.id, false, {
                                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                                    lineNumber: 2136,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/resume-templates.tsx",
                                                            lineNumber: 2134,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, category, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2132,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2127,
                                        columnNumber: 15
                                    }, this),
                                    profile?.hobbies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: accentColor,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.08em',
                                                    marginBottom: 6,
                                                    paddingBottom: 4,
                                                    borderBottom: `2px solid ${accentColor}30`
                                                },
                                                children: "Interests"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 9,
                                                    color: '#555',
                                                    margin: 0,
                                                    lineHeight: 1.6
                                                },
                                                children: profile.hobbies
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2154,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2150,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2073,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2049,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 2033,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 13. INFRESH — "Infresh"
// Modern fresh layout with rounded sections and soft shadows
// ════════════════════════════════════════════════════════════════
function InfreshTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accent = '#7c3aed';
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: 0,
            background: '#fafafa',
            overflow: 'visible'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '14mm 15mm 8mm'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            marginBottom: 8
                        },
                        children: [
                            profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.image,
                                alt: "",
                                style: {
                                    width: 48,
                                    height: 60,
                                    borderRadius: 4,
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    flexShrink: 0,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2183,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: 22,
                                            fontWeight: 800,
                                            margin: 0,
                                            color: '#111',
                                            letterSpacing: '-0.02em'
                                        },
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2186,
                                        columnNumber: 13
                                    }, this),
                                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            color: accent,
                                            fontWeight: 600,
                                            marginTop: 2
                                        },
                                        children: profile.jobTitle
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2188,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2181,
                        columnNumber: 9
                    }, this),
                    contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6,
                            marginTop: 8
                        },
                        children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 8,
                                    background: 'white',
                                    padding: '3px 10px',
                                    borderRadius: 12,
                                    color: '#555',
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                    wordBreak: 'break-all'
                                },
                                children: item
                            }, i, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2195,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2193,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '0 15mm 15mm'
                },
                children: [
                    profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: 10,
                            padding: 14,
                            marginBottom: 14,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: accent,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: 6
                                },
                                children: "About Me"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2211,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 9.5,
                                    color: '#444',
                                    margin: 0,
                                    lineHeight: 1.6
                                },
                                children: profile.summary
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2210,
                        columnNumber: 11
                    }, this),
                    experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: 10,
                            padding: 14,
                            marginBottom: 14,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: accent,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: 8
                                },
                                children: "Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2221,
                                columnNumber: 13
                            }, this),
                            experiences.map((exp, idx)=>{
                                const bullets = parseBullets(exp.description);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: idx < experiences.length - 1 ? 10 : 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        margin: 0,
                                                        color: '#111'
                                                    },
                                                    children: exp.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2229,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 8,
                                                        color: '#999',
                                                        flexShrink: 0,
                                                        marginLeft: 8,
                                                        background: '#f3f4f6',
                                                        padding: '2px 8px',
                                                        borderRadius: 8
                                                    },
                                                    children: dateRange(exp.startDate, exp.endDate, exp.current)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2230,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2228,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 9,
                                                color: accent,
                                                fontWeight: 600
                                            },
                                            children: [
                                                exp.company,
                                                exp.location ? ` · ${exp.location}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2234,
                                            columnNumber: 19
                                        }, this),
                                        bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '3px 0 0',
                                                paddingLeft: 14,
                                                fontSize: 9,
                                                color: '#444',
                                                lineHeight: 1.5
                                            },
                                            children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        marginBottom: 1
                                                    },
                                                    children: b
                                                }, i, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2239,
                                                    columnNumber: 46
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2238,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2227,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2220,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 12
                        },
                        children: [
                            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    background: 'white',
                                    borderRadius: 10,
                                    padding: 14,
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: accent,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            marginBottom: 8
                                        },
                                        children: "Education"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2252,
                                        columnNumber: 15
                                    }, this),
                                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9.5,
                                                        fontWeight: 700,
                                                        color: '#111'
                                                    },
                                                    children: [
                                                        edu.degree,
                                                        edu.field ? ` in ${edu.field}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2257,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9,
                                                        color: '#555'
                                                    },
                                                    children: edu.institution
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2260,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 8,
                                                        color: '#999'
                                                    },
                                                    children: dateRange(edu.startDate, edu.endDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2261,
                                                    columnNumber: 19
                                                }, this),
                                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 8,
                                                        color: '#666'
                                                    },
                                                    children: [
                                                        "GPA: ",
                                                        edu.gpa
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/resume-templates.tsx",
                                                    lineNumber: 2262,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, edu.id, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2256,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2251,
                                columnNumber: 13
                            }, this),
                            skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    background: 'white',
                                    borderRadius: 10,
                                    padding: 14,
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: accent,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            marginBottom: 8
                                        },
                                        children: "Skills"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 4
                                        },
                                        children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 8,
                                                    background: `${accent}12`,
                                                    padding: '3px 10px',
                                                    borderRadius: 14,
                                                    color: accent,
                                                    fontWeight: 500
                                                },
                                                children: skill.name
                                            }, skill.id, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2275,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2273,
                                        columnNumber: 15
                                    }, this),
                                    profile?.hobbies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 8,
                                                    fontWeight: 600,
                                                    color: '#888',
                                                    marginBottom: 3,
                                                    textTransform: 'uppercase'
                                                },
                                                children: "Interests"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2285,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 8.5,
                                                    color: '#555',
                                                    margin: 0,
                                                    lineHeight: 1.5
                                                },
                                                children: profile.hobbies
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2286,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2284,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2269,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 2178,
        columnNumber: 5
    }, this);
}
// ════════════════════════════════════════════════════════════════
// 14. TYPOGRAPH — "Typograph"
// Typography-first design with large name, minimal decoration, editorial style
// ════════════════════════════════════════════════════════════════
function TypographTemplate({ profile, experiences, education, skills }) {
    const name = fullName(profile);
    const accent = '#ea580c';
    const contactItems = [
        profile?.email,
        profile?.phone,
        profile?.location,
        profile?.website,
        profile?.linkedin,
        profile?.github
    ].filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...a4Style,
            padding: '18mm 18mm 15mm',
            overflow: 'visible'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 4
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: {
                        fontSize: 36,
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        margin: 0,
                        color: '#000',
                        lineHeight: 1,
                        textTransform: 'uppercase'
                    },
                    children: name
                }, void 0, false, {
                    fileName: "[project]/src/components/resume-templates.tsx",
                    lineNumber: 2314,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 8
                },
                children: [
                    profile?.jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: accent,
                            fontWeight: 600,
                            letterSpacing: '0.02em'
                        },
                        children: profile.jobTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2325,
                        columnNumber: 11
                    }, this),
                    profile?.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: profile.image,
                        alt: "",
                        style: {
                            width: 44,
                            height: 55,
                            borderRadius: 4,
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            flexShrink: 0,
                            marginLeft: 'auto',
                            border: '1.5px solid #ddd'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2330,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2323,
                columnNumber: 7
            }, this),
            contactItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 8.5,
                    color: '#666',
                    letterSpacing: '0.02em',
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: '1px solid #ddd'
                },
                children: contactItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            item,
                            i < contactItems.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: accent,
                                    margin: '0 6px'
                                },
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2338,
                                columnNumber: 64
                            }, this) : ''
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2338,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2336,
                columnNumber: 9
            }, this),
            profile?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 18
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 8,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: 6,
                            color: accent
                        },
                        children: "Profile"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2346,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: '#333',
                            margin: 0,
                            lineHeight: 1.7,
                            fontWeight: 300
                        },
                        children: profile.summary
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2349,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2345,
                columnNumber: 9
            }, this),
            experiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 18
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 8,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: 10,
                            color: accent
                        },
                        children: "Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2356,
                        columnNumber: 11
                    }, this),
                    experiences.map((exp, idx)=>{
                        const bullets = parseBullets(exp.description);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: idx < experiences.length - 1 ? 12 : 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontSize: 11,
                                                fontWeight: 700,
                                                margin: 0,
                                                color: '#000'
                                            },
                                            children: exp.position
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2364,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 8,
                                                color: '#999',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(exp.startDate, exp.endDate, exp.current)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2365,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2363,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 10,
                                        color: accent,
                                        fontWeight: 500,
                                        fontFamily: 'Georgia, serif',
                                        fontStyle: 'italic'
                                    },
                                    children: [
                                        exp.company,
                                        exp.location ? `, ${exp.location}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2369,
                                    columnNumber: 17
                                }, this),
                                bullets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        margin: '4px 0 0',
                                        paddingLeft: 16,
                                        fontSize: 9.5,
                                        color: '#444',
                                        lineHeight: 1.6,
                                        fontWeight: 300
                                    },
                                    children: bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                marginBottom: 2
                                            },
                                            children: b
                                        }, i, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2374,
                                            columnNumber: 44
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2373,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, exp.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 2362,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2355,
                columnNumber: 9
            }, this),
            education.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 18
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 8,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: 8,
                            color: accent
                        },
                        children: "Education"
                    }, void 0, false, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2386,
                        columnNumber: 11
                    }, this),
                    education.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: '#000'
                                            },
                                            children: [
                                                edu.degree,
                                                edu.field ? ` in ${edu.field}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2392,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 8,
                                                color: '#999',
                                                flexShrink: 0,
                                                marginLeft: 8
                                            },
                                            children: dateRange(edu.startDate, edu.endDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/resume-templates.tsx",
                                            lineNumber: 2395,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2391,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 9.5,
                                        color: accent,
                                        fontWeight: 500,
                                        fontFamily: 'Georgia, serif',
                                        fontStyle: 'italic'
                                    },
                                    children: edu.institution
                                }, void 0, false, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2399,
                                    columnNumber: 15
                                }, this),
                                edu.gpa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 8.5,
                                        color: '#666'
                                    },
                                    children: [
                                        "GPA: ",
                                        edu.gpa
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/resume-templates.tsx",
                                    lineNumber: 2400,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, edu.id, true, {
                            fileName: "[project]/src/components/resume-templates.tsx",
                            lineNumber: 2390,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2385,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 24
                },
                children: [
                    skills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 8,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    marginBottom: 8,
                                    color: accent
                                },
                                children: "Skills"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2410,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 6
                                },
                                children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 9,
                                            color: '#333',
                                            fontWeight: 400
                                        },
                                        children: [
                                            skill.name,
                                            skills.indexOf(skill) < skills.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: accent,
                                                    marginLeft: 6
                                                },
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/resume-templates.tsx",
                                                lineNumber: 2416,
                                                columnNumber: 76
                                            }, this) : ''
                                        ]
                                    }, skill.id, true, {
                                        fileName: "[project]/src/components/resume-templates.tsx",
                                        lineNumber: 2415,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2413,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2409,
                        columnNumber: 11
                    }, this),
                    profile?.hobbies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 8,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    marginBottom: 8,
                                    color: accent
                                },
                                children: "Interests"
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2424,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 9,
                                    color: '#555',
                                    margin: 0,
                                    lineHeight: 1.6,
                                    fontWeight: 300
                                },
                                children: profile.hobbies
                            }, void 0, false, {
                                fileName: "[project]/src/components/resume-templates.tsx",
                                lineNumber: 2427,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/resume-templates.tsx",
                        lineNumber: 2423,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2407,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/resume-templates.tsx",
        lineNumber: 2311,
        columnNumber: 5
    }, this);
}
function renderResume(templateId, data) {
    switch(templateId){
        case 'minimal':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MinimalTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2442,
                columnNumber: 14
            }, this);
        case 'modern':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModernTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2444,
                columnNumber: 14
            }, this);
        case 'professional':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfessionalTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2446,
                columnNumber: 14
            }, this);
        case 'creative':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreativeTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2448,
                columnNumber: 14
            }, this);
        case 'executive':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecutiveTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2450,
                columnNumber: 14
            }, this);
        case 'compact':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2452,
                columnNumber: 14
            }, this);
        case 'elegant':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ElegantTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2454,
                columnNumber: 14
            }, this);
        case 'technical':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TechnicalTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2456,
                columnNumber: 14
            }, this);
        case 'academic':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AcademicTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2458,
                columnNumber: 14
            }, this);
        case 'bold':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BoldTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2460,
                columnNumber: 14
            }, this);
        case 'swiss':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SwissTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2462,
                columnNumber: 14
            }, this);
        case 'corporate':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CorporateTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2464,
                columnNumber: 14
            }, this);
        case 'infresh':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfreshTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2466,
                columnNumber: 14
            }, this);
        case 'typograph':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TypographTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2468,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MinimalTemplate, {
                ...data
            }, void 0, false, {
                fileName: "[project]/src/components/resume-templates.tsx",
                lineNumber: 2470,
                columnNumber: 14
            }, this);
    }
}
const TEMPLATE_LIST = [
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean and elegant single-column layout'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Contemporary two-column with dark sidebar'
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Classic corporate format'
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Design-forward with visual accents'
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'C-Suite level professional format'
    },
    {
        id: 'compact',
        name: 'Compact',
        description: 'Maximum content, minimum space'
    },
    {
        id: 'elegant',
        name: 'Elegant',
        description: 'Timeless sophistication with serif headings'
    },
    {
        id: 'technical',
        name: 'Technical',
        description: 'Developer-focused with code-style accents'
    },
    {
        id: 'academic',
        name: 'Academic',
        description: 'Traditional academic CV with education first'
    },
    {
        id: 'bold',
        name: 'Bold',
        description: 'Stand out with a vibrant gradient header'
    },
    {
        id: 'swiss',
        name: 'Swiss',
        description: 'Grid-based layout with red accent bar'
    },
    {
        id: 'corporate',
        name: 'Corporate',
        description: 'Traditional corporate with teal header'
    },
    {
        id: 'infresh',
        name: 'Infresh',
        description: 'Modern card-based with rounded sections'
    },
    {
        id: 'typograph',
        name: 'Typograph',
        description: 'Typography-first editorial design'
    }
];
}),
];

//# sourceMappingURL=src_components_resume-templates_tsx_d9975cb7._.js.map