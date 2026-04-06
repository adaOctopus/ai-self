import type { VoiceTypeId } from "./voiceTypes";
import { VOICE_TYPES } from "./voiceTypes";

export function voiceResultMarkdown(
  dominant: VoiceTypeId,
  secondary: VoiceTypeId,
): string {
  const d = VOICE_TYPES[dominant];
  const s = VOICE_TYPES[secondary];
  return `## Your inner voices

You are **${d.name}** with elements of **${s.name}**.

**${d.tagline}**

${d.description}

### What this costs you

${d.cost}

### Your hidden gift

${d.gift}

### Where to start

- **Read:** ${d.chapter}
- **Posters to live with:**  
${d.posters.map((p) => `  - “${p}”`).join("\n")}
- **Starter experiment:** ${d.experiment}

---

*Secondary voice — ${s.name} (${s.tagline}): keep this as a lens, not a label.*
`;
}
