
export async function pingApi(): Promise<{ ok: boolean; rttMs: number}> {

    const start = performance.now();

    try {

        const res = await fetch("/api/ping");
        const rttMs = performance.now() - start;

        if (!res.ok) return {ok: false, rttMs};         // if the backend does not return ok, return false and the rttMs(will not be a true rttMs)


        return {ok: true, rttMs};                       // otherwise, return true and the rttMs
    } catch{
        return {ok: false, rttMs: 0};                   // if the request failed, return false and the rttMs(will not be a true rttMs)
    }
}