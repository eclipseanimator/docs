--@author rniraclefire

-- https://create.roblox.com/docs/reference/engine/datatypes/ColorSequence
const function evalColorSequence(sequence: ColorSequence, time: number)
    -- If time is 0 or 1, return the first or last value respectively
    if time == 0 then
        return sequence.Keypoints[1].Value
    elseif time == 1 then
        return sequence.Keypoints[#sequence.Keypoints].Value
    end

    -- Otherwise, step through each sequential pair of keypoints
    for i = 1, #sequence.Keypoints - 1 do
        local thisKeypoint = sequence.Keypoints[i]
        local nextKeypoint = sequence.Keypoints[i + 1]
        if time >= thisKeypoint.Time and time < nextKeypoint.Time then
            -- Calculate how far alpha lies between the points
            local alpha = (time - thisKeypoint.Time) / (nextKeypoint.Time - thisKeypoint.Time)
            -- Evaluate the real value between the points using alpha
            return Color3.new(
                (nextKeypoint.Value.R - thisKeypoint.Value.R) * alpha + thisKeypoint.Value.R,
                (nextKeypoint.Value.G - thisKeypoint.Value.G) * alpha + thisKeypoint.Value.G,
                (nextKeypoint.Value.B - thisKeypoint.Value.B) * alpha + thisKeypoint.Value.B
            )
        end
    end
end

const colorSequence = ColorSequence.new {
    ColorSequenceKeypoint.new(0, Color3.fromHex("#151321")),
    ColorSequenceKeypoint.new(1 / 3, Color3.fromHex("29243c")),
    ColorSequenceKeypoint.new(1, Color3.fromHex("ece5f3"))
}

for step = 100, 900, 100 do
    const alpha = math.map(step, 100, 900, 1, 0)
    const out = evalColorSequence(colorSequence, alpha)
    print(`--color-gray-{step}: rgb({string.format("%.3f, %.3f, %.3f", out.R * 255, out.G * 255, out.B * 255)});`)
end
