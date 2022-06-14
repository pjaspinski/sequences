import { Action, ActiveAction } from "sequences-types";

export const transformActionToActiveAction = (template: Action, id: number): ActiveAction => {
    const action = {
        id,
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
