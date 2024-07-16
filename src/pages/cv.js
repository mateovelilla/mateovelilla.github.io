import cv from '../../cv.json'
export async function GET({params, request}) {
    return new Response(
        JSON.stringify(cv)
    )
}