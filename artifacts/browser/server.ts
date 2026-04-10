import { createDocumentHandler } from '@/lib/artifacts/server';

export const browserDocumentHandler = createDocumentHandler<'browser'>({
  kind: 'browser',
  
  onCreateDocument: async ({ title, dataStream, id }) => {
    // Generate a unique session ID for this browser artifact
    const sessionId = `browser-${id}-${Date.now()}`;

    // Create static content immediately without AI model call
    const draftContent = `# ${title}

Browser automation session starting...

## Session Information
- **Session ID**: \`${sessionId}\`
- **Document ID**: \`${id}\`
- **Created**: ${new Date().toISOString()}
- **Status**: Ready
- **Connection**: Ready for browser automation

## Action Log
*Browser actions will be logged here as they occur.*

---

*This browser session is ready for web automation tasks. The live browser view will appear when automation begins.*`;

    dataStream.write({
      type: 'data-textDelta',
      data: draftContent,
      transient: true,
    });

    return draftContent;
  },

  onUpdateDocument: async ({ document, description, dataStream }) => {
    // For browser artifacts, just append the update note to existing content
    const updateNote = `\n\n### Update: ${description}\n*Updated: ${new Date().toISOString()}*`;

    const draftContent = document.content + updateNote;

    dataStream.write({
      type: 'data-textDelta',
      data: draftContent,
      transient: true,
    });

    return draftContent;
  },
});
