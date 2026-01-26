"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const categoryData: Record<string, { name: string; description: string; subcategories: Array<{ name: string; description: string; slug: string; itemCount: number; image: string }> }> = {
    'guitars-bass': {
        name: 'Guitars & Bass',
        description: 'Electric, acoustic, and bass guitars from legendary brands',
        subcategories: [
            {
                name: 'Electric Guitars',
                description: 'Solid body, semi-hollow, and hollow body electric guitars',
                slug: 'electric-guitars',
                itemCount: 78,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbil7qwiBxoJh8mFMG2UEv0Ib_MmNauxUc3bcnnblKy9M8JPE8qXMcwxoFVFAVDR4YzFNMYOCo7T6wwEn9x2oFgXV_ZfrNlE1xmGZuvarKOJZonaUzkmRVhKYYpFENzaUA33RZgbEcYhZ2gKvLA226E65yasmR30HYfLfzV5wAl5wMpcSeJ5LQNmSzh4ZUwBRxq8ItYhIs8bWvCRMdCluJt7bW_HL41W85wtwL-V7uvG_CrSoU8qNpk-0yFiYjFfrPHYtex9eVgNsk'
            },
            {
                name: 'Acoustic Guitars',
                description: 'Steel-string and classical acoustic guitars',
                slug: 'acoustic-guitars',
                itemCount: 45,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwYp5l1mQemPgU7sNkkRWHh_tG7u8_ULZrwyNuE6L5zVL2cCgXQdOS2lJMBe98368gEt9c08jAwfzCnwevc5zCc0hTvgOSWYvhg5p1j3LdiLZRckxzKwlLQz4Lo09DzZcogAWlJxLpc9hmuravQ1_Z-AVk0WVi-zh0K32qS7F2e60noHQL3sMqNEcFViS8OqcfyuVU_9WYYflN6m4nT9TYbwjENlsNN-aZ2exQVwhxNlfIe0H9Qt9zI1jmKPB7eRod3781VXGPeqrW'
            },
            {
                name: 'Bass Guitars',
                description: '4-string, 5-string, and 6-string bass guitars',
                slug: 'bass-guitars',
                itemCount: 33,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy57ZV9kktc5P8mcXCduy10EgZGyXQrdEGEfxRUHM_okByEO43ER4T614MHHr93tK_oQYfVC6RG2KY7Ew_exH9I97xcvJVXt8UTTwhO7pHkS3O7UqtN1li-lqSLk82H9fXKrg21YgRE1C_ddbu33Tv38aaj2jHweTsbgos-KQNAGkrhlM723wyEQkns-0HLAljtQgMuXCEQzzvgqBekNGzSNEkD9vwJQvJa_JXiGfg4JXJzDK4JCfjVR6CNEDy5GtlpZw67i9m7nG6'
            },
            {
                name: 'Guitar Effects',
                description: 'Guitar pedals, stompboxes, and effects',
                slug: 'guitar-effects',
                itemCount: 33,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy57ZV9kktc5P8mcXCduy10EgZGyXQrdEGEfxRUHM_okByEO43ER4T614MHHr93tK_oQYfVC6RG2KY7Ew_exH9I97xcvJVXt8UTTwhO7pHkS3O7UqtN1li-lqSLk82H9fXKrg21YgRE1C_ddbu33Tv38aaj2jHweTsbgos-KQNAGkrhlM723wyEQkns-0HLAljtQgMuXCEQzzvgqBekNGzSNEkD9vwJQvJa_JXiGfg4JXJzDK4JCfjVR6CNEDy5GtlpZw67i9m7nG6'
            }
        ]
    },
    'synthesizers': {
        name: 'Synthesizers',
        description: 'Analog and digital synths for modern sound design',
        subcategories: [
            {
                name: 'Analog Synths',
                description: 'Classic analog synthesizers with warm, organic sound',
                slug: 'analog-synths',
                itemCount: 42,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAx_H4t83QufGPC6rKJWtQCpieLqwmbruDk_M3tk93AN5Sytx-MjP5hfwdVMo4KXb-PGIWEeyfD-iRYE9Ek6MPqFRxrk1HJfbBcfrc1oQyRpB0ippzN3nRdZfh5lqZPt-AEcF9E7ruT_RwulCu_IOZ1j59lUJK7LVwSgMH3YDfeY8juoCA2i3NXPNjDalDuz0jxsSy6st7tZyQfCqUKpF7u5Ru4Hg2QyMzQDQE6__uFS6yetUEPZmU_CGEnQ8JmzR7C209ZelMRfDP'
            },
            {
                name: 'Digital Synths',
                description: 'Modern digital synthesizers and workstations',
                slug: 'digital-synths',
                itemCount: 31,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-'
            },
            {
                name: 'Modular Synths',
                description: 'Eurorack and modular synthesis systems',
                slug: 'modular-synths',
                itemCount: 16,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE8p0SvHmkin-p80Jji4-3NsMLX7zzeySSwR33Atp2H6OSh574HXyVzypkqrBP9qZKnN1hVnDvzzO0ApBkUYqN2l_m_QCFB8kXeDKem6bIK6kCiiUjJSG-bzeft3CpxRG2rT_ckpq6NebCyN59jla8_Zxi9T6dFxCpo83o1Ic-CQqvILhXja2y0CBoCbiaszMw2wunWLPbKDOqJJwK10s774r_jBqv9HBICXsqdnRUlDpcbo1xVcoG55miatzbXO5ASRoX0ENTqaE1'
            }
        ]
    },
    'studio-recording': {
        name: 'Studio & Recording',
        description: 'Professional monitors, interfaces, and outboard gear',
        subcategories: [
            {
                name: 'Studio Monitors',
                description: 'Active and passive studio monitor speakers',
                slug: 'studio-monitors',
                itemCount: 67,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC__89zTWgo7jrFLvCmdO52ks-IpLTZcsU354YO0yvBtyeARVvKrSq8cUoH6i4NLs2kB34O0ULzB4bm7fjpTiJhW6XUMj1-xtaXNH8O8KeXctlRntzNqxcCwjKG7FrAdp_YAWaeRYs2ywgM5uoGvGvilaIrLN09xeIOYLrcQpOxhpeZAOia7bn0kfXehGlOPjZ3JmAyoOYyxdWbnVrqmszhAhoj8gSMWP5qzB1J7TWNakK1zqNgpckQRuY077zQORZNTnpIUq3xHtA3'
            },
            {
                name: 'Audio Interfaces',
                description: 'USB, Thunderbolt, and PCIe audio interfaces',
                slug: 'audio-interfaces',
                itemCount: 89,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcAyNkMq7p0siCZ6UzURRJdNanRhAsy6y8MyRxHK2Y2vpehaPtXh6JgkvOjlMi4rl8ZDkcGjRzSGeDMPljzx77Q8q7SYE0hlPq9-Q_z84gF6ybx06C9ThxF3wrke5-lhRSXIw70DslEDJ0sod3z2TE97MecejPKStOSUvFguR9kDPWF1pZiu3ZixRKFAbN5U06DFNl8xeS5HwwEnC-y44LKYo2ojwBJWxjiD-0VZ21jl6by2NzZLcgil3dyC26XjbduBXkuRKjh3P'
            },
            {
                name: 'Outboard Gear',
                description: 'Compressors, EQs, and signal processors',
                slug: 'outboard-gear',
                itemCount: 78,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5nDE8Ve9d_qPNLASLMCZouohBKQxKa6GvkkDxQTdRbkUqHQu-I5nXzSjmctmcB97qPD_jQtMua8hH0cSenTI7nk-6k0Wv4b8jR72UNuVCOpB3O7fFKf2v6E8JQuXjLpUPBDbPG_E4SwctiASXYoUgHEWx6_YFVbmFTSuFpdhvTkuj0p2FKUVQhULUXpa9E0a3LgEY82xzU7HBNOyiRyEFNpFjIoaj9ZD6ndSvx5yexQvhD6r-5OWbOiKGzRrvCtNTctIrtpu1iq3X'
            }
        ]
    },
    'wind-brass': {
        name: 'Wind & Brass',
        description: 'Woodwinds, brass, and percussion instruments',
        subcategories: [
            {
                name: 'Woodwinds',
                description: 'Flutes, clarinets, saxophones, and more',
                slug: 'woodwinds',
                itemCount: 42,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j'
            },
            {
                name: 'Brass',
                description: 'Trumpets, trombones, tubas, and more',
                slug: 'brass',
                itemCount: 31,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j'
            }
        ]
    },
    'drums-percussion': {
        name: 'Drums & Percussion',
        description: 'Acoustic kits, electronic drums, and percussion instruments',
        subcategories: [
            {
                name: 'Acoustic Drums',
                description: 'Complete drum kits and individual drums',
                slug: 'acoustic-drums',
                itemCount: 54,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j'
            },
            {
                name: 'Electronic Drums',
                description: 'Digital drum kits and pads',
                slug: 'electronic-drums',
                itemCount: 41,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j'
            },
            {
                name: 'Percussion',
                description: 'Hand percussion and auxiliary instruments',
                slug: 'percussion',
                itemCount: 32,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j'
            }
        ]
    },
    'keys-pianos': {
        name: 'Keys & Pianos',
        description: 'Digital pianos, stage keyboards, and MIDI controllers',
        subcategories: [
            {
                name: 'Digital Pianos',
                description: 'Weighted key digital pianos',
                slug: 'digital-pianos',
                itemCount: 38,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_L7eEoipCgCeGhPrTmr3jryMwYPoRkGK9UU9_u3q2wWCPh-HQ9l8qK6lhk667lAiIxhpdbDXNdX1DhvXb-mZBMC5gA0FMQ-VJObwplmtd34RLaafJIxYODMSwl1Ly3o_AN9_WyEyMx8B7QiUMFCzxYv75NPbVLlzeccdDwtmV-7akHkJTP22p73f10PgriHOy1k27EgcjmSnhlfvPLw662VcMY6XK_ifeyoKULDiMg1e2VabumEvgGRsvE7g6Q4iHeWbmB7wZD-A'
            },
            {
                name: 'Stage Keyboards',
                description: 'Portable keyboards for live performance',
                slug: 'stage-keyboards',
                itemCount: 34,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_L7eEoipCgCeGhPrTmr3jryMwYPoRkGK9UU9_u3q2wWCPh-HQ9l8qK6lhk667lAiIxhpdbDXNdX1DhvXb-mZBMC5gA0FMQ-VJObwplmtd34RLaafJIxYODMSwl1Ly3o_AN9_WyEyMx8B7QiUMFCzxYv75NPbVLlzeccdDwtmV-7akHkJTP22p73f10PgriHOy1k27EgcjmSnhlfvPLw662VcMY6XK_ifeyoKULDiMg1e2VabumEvgGRsvE7g6Q4iHeWbmB7wZD-A'
            },
            {
                name: 'MIDI Controllers',
                description: 'USB MIDI keyboards and pad controllers',
                slug: 'midi-controllers',
                itemCount: 26,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_L7eEoipCgCeGhPrTmr3jryMwYPoRkGK9UU9_u3q2wWCPh-HQ9l8qK6lhk667lAiIxhpdbDXNdX1DhvXb-mZBMC5gA0FMQ-VJObwplmtd34RLaafJIxYODMSwl1Ly3o_AN9_WyEyMx8B7QiUMFCzxYv75NPbVLlzeccdDwtmV-7akHkJTP22p73f10PgriHOy1k27EgcjmSnhlfvPLw662VcMY6XK_ifeyoKULDiMg1e2VabumEvgGRsvE7g6Q4iHeWbmB7wZD-A'
            }
        ]
    },
    'dj-production': {
        name: 'DJ & Production',
        description: 'Controllers, mixers, and production equipment',
        subcategories: [
            {
                name: 'DJ Controllers',
                description: 'Digital DJ controllers and turntables',
                slug: 'dj-controllers',
                itemCount: 56,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-'
            },
            {
                name: 'DJ Mixers',
                description: 'Professional DJ mixers and battle mixers',
                slug: 'dj-mixers',
                itemCount: 43,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-'
            },
            {
                name: 'Production Gear',
                description: 'Samplers, grooveboxes, and sequencers',
                slug: 'production-gear',
                itemCount: 46,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-'
            }
        ]
    },
    'amplifiers': {
        name: 'Amplifiers',
        description: 'Guitar amps, bass amps, and PA systems',
        subcategories: [
            {
                name: 'Guitar Amps',
                description: 'Tube, solid-state, and modeling guitar amplifiers',
                slug: 'guitar-amps',
                itemCount: 42,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCS3zfXFqbfwvYUF8eAb0dLHFzQySs9GB3WNBAXPA_lJvmHNnL54KcCK0SpyM7VUK7TkdZ93dzMhTTIq3Mrl-GgGrkZoWJdpIT8nCSD8h1ZYowXlLMTY6rVAC6n7zaK7YyALCdaT2pOMKu0Ok2O-dbyObLmKG3pRG_u5RfyCNd-3Hr2Hi3LzdSXZHcZJun8NAjYNB2Tl366tzXsV_qKpdJSfjhXKzTaAVN5MFa6rwE62FAqLDIpauHh4XpUg7MGuUCoHylXai5eN_r'
            },
            {
                name: 'Bass Amps',
                description: 'Bass amplifier heads and combos',
                slug: 'bass-amps',
                itemCount: 24,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCS3zfXFqbfwvYUF8eAb0dLHFzQySs9GB3WNBAXPA_lJvmHNnL54KcCK0SpyM7VUK7TkdZ93dzMhTTIq3Mrl-GgGrkZoWJdpIT8nCSD8h1ZYowXlLMTY6rVAC6n7zaK7YyALCdaT2pOMKu0Ok2O-dbyObLmKG3pRG_u5RfyCNd-3Hr2Hi3LzdSXZHcZJun8NAjYNB2Tl366tzXsV_qKpdJSfjhXKzTaAVN5MFa6rwE62FAqLDIpauHh4XpUg7MGuUCoHylXai5eN_r'
            },
            {
                name: 'PA Systems',
                description: 'Powered speakers and PA systems',
                slug: 'pa-systems',
                itemCount: 10,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCS3zfXFqbfwvYUF8eAb0dLHFzQySs9GB3WNBAXPA_lJvmHNnL54KcCK0SpyM7VUK7TkdZ93dzMhTTIq3Mrl-GgGrkZoWJdpIT8nCSD8h1ZYowXlLMTY6rVAC6n7zaK7YyALCdaT2pOMKu0Ok2O-dbyObLmKG3pRG_u5RfyCNd-3Hr2Hi3LzdSXZHcZJun8NAjYNB2Tl366tzXsV_qKpdJSfjhXKzTaAVN5MFa6rwE62FAqLDIpauHh4XpUg7MGuUCoHylXai5eN_r'
            }
        ]
    },
    'accessories': {
        name: 'Accessories',
        description: 'Cables, stands, cases, and essential gear',
        subcategories: [
            {
                name: 'Cables & Connectors',
                description: 'Instrument cables, patch cables, and adapters',
                slug: 'cables-connectors',
                itemCount: 156,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoR-_dFaL_lHvgDUGC_e0AeO33bCu3HOTLylK2yeqjKSBbPywNYluMt2ncb-cE2J8370EqlUYXu6gU9SM8awtybV_KE601Rzo4PO-OLrk9JF963rIkY_T4vZGctsYv_Pb7KUJyCJfMB61ZLOEuWm3uK9yy8zHWYH-p6UFAm6W17d92s3hydxWWhGn5pT_4srqRa4lC4HFr7N6SjJIRhHa3Xd7MiMIWHxmU9Cl4RlV9sLFN1lvHaEWXrUIiXfafeHSHaR66VF653Yh5'
            },
            {
                name: 'Stands & Mounts',
                description: 'Mic stands, guitar stands, and keyboard stands',
                slug: 'stands-mounts',
                itemCount: 89,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoR-_dFaL_lHvgDUGC_e0AeO33bCu3HOTLylK2yeqjKSBbPywNYluMt2ncb-cE2J8370EqlUYXu6gU9SM8awtybV_KE601Rzo4PO-OLrk9JF963rIkY_T4vZGctsYv_Pb7KUJyCJfMB61ZLOEuWm3uK9yy8zHWYH-p6UFAm6W17d92s3hydxWWhGn5pT_4srqRa4lC4HFr7N6SjJIRhHa3Xd7MiMIWHxmU9Cl4RlV9sLFN1lvHaEWXrUIiXfafeHSHaR66VF653Yh5'
            },
            {
                name: 'Cases & Bags',
                description: 'Gig bags, hard cases, and rack cases',
                slug: 'cases-bags',
                itemCount: 67,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoR-_dFaL_lHvgDUGC_e0AeO33bCu3HOTLylK2yeqjKSBbPywNYluMt2ncb-cE2J8370EqlUYXu6gU9SM8awtybV_KE601Rzo4PO-OLrk9JF963rIkY_T4vZGctsYv_Pb7KUJyCJfMB61ZLOEuWm3uK9yy8zHWYH-p6UFAm6W17d92s3hydxWWhGn5pT_4srqRa4lC4HFr7N6SjJIRhHa3Xd7MiMIWHxmU9Cl4RlV9sLFN1lvHaEWXrUIiXfafeHSHaR66VF653Yh5'
            }
        ]
    }
};

const CategoryPage: React.FC = () => {
    const params = useParams();
    const categorySlug = Array.isArray(params.category) ? params.category[0] : params.category;
    const category = categoryData[categorySlug];

    if (!category) {
        return (
            <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                <Link href="/catalog" className="text-primary hover:underline">Back to Catalog</Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-6 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                <Link className="hover:text-primary uppercase tracking-wider" href="/">Home</Link>
                <span className="material-symbols-outlined !text-xs">chevron_right</span>
                <Link className="hover:text-primary uppercase tracking-wider" href="/catalog">Catalog</Link>
                <span className="material-symbols-outlined !text-xs">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider">{category.name}</span>
            </nav>

            {/* Page Header */}
            <div className="mb-12">
                <h1 className="text-5xl font-extrabold tracking-tighter mb-4">{category.name}</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                    {category.description}
                </p>
            </div>

            {/* Subcategory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subcategories.map((subcategory) => (
                    <Link
                        key={subcategory.slug}
                        href={`/catalog/${categorySlug}/${subcategory.slug}`}
                        className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="relative aspect-[16/9] overflow-hidden bg-slate-50 dark:bg-slate-950">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url('${subcategory.image}')`
                                }}
                            />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-2 py-1 rounded backdrop-blur-sm">
                                    {subcategory.itemCount} Items
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {subcategory.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {subcategory.description}
                            </p>
                            <div className="flex items-center gap-2 text-primary text-sm font-bold">
                                <span>Browse Products</span>
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
