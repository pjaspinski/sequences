import { Action, ActiveAction } from "sequences-types";
import { v4 as uuid } from "uuid";

export const transformActionToActiveAction = (template: Action): ActiveAction => {
    const action = {
        id: uuid(),
        delay: 1000,
        name: template.name,
        templateId: template.id,
        settings: template.settingsInputs.reduce(
            (acc, input) => ({ ...acc, [input.id]: input.value }),
            {}
        ),
    };
    return action;
};
