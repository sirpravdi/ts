import { backgroundColors, effects, fontColors, Reset } from './model';

type Color = keyof typeof fontColors;
type Effect = keyof typeof effects;
interface Options {
    font?: Color;
    background?: Color;
    effects?: Effect[];
}

function addColor(text: string, color: Color, isBackground: boolean = false):string {
    if (isBackground) {
        return text + backgroundColors[color];
    }
    return text + fontColors[color];
}

function getEffects(effectList: Effect[]): string{
    return effectList.map((effect: Effect) => effects[effect]).join('');
}

export function color(text: string, options: Options): string {
    const preparedText = text.replace(/ё/g, 'е');
    let result = '';

    if (options) {
        if (options.font) {
            result = addColor(result, options.font);
        }
        if (options.background) {
            result = addColor(result, options.background, true);
        }
        if (options.effects) {
            result += getEffects(options.effects);
        }
        result += preparedText;
        result += Reset;
        return result;
    }

    return preparedText;
}
