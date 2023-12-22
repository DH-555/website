import { error } from '@sveltejs/kit';
import { getMessages, getRelatedThreads, getThread } from '../helpers.js';
import { deterministicRandom, random } from '$lib/utils/random.js';

export const prerender = false;

export const load = async ({ params, fetch }) => {
    const id = params.id;

    try {
        const thread = await getThread(id);
        const related = await getRelatedThreads(thread);

        // const tldrPrompt = `Title: ${thread.name}\nDescription:${thread.content}\nMessages:\n
        //     ${thread.messages?.map((m) => `${m.author}: ${m.message}`).join('\n')}`;
        // const response = await fetch('/api/tldr', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ prompt: tldrPrompt })
        // });

        // const tldr = (await response.text()).replace(/TL;DR(:)?/g, '');
        const tldr =
            'Solution: Mosh Ontong solved the 500 internal error by moving the log to the top and revisiting all the files to check for red error lines.';

        const upvotes = random(1, 60);

        const messages = getMessages(thread.$id);

        return { ...thread, messages, related, tldr, upvotes };
    } catch (e) {
        console.log(e);
        throw error(404, 'Thread not found');
    }
};
