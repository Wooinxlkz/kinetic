import { Callout } from "@/components/static/callout";

export function CalloutPreview() {
  return (
    <div className="flex flex-col gap-3 p-6 w-full max-w-md">
      <Callout variant="info" title="Did you know?">
        You can customise every token in the theme via CSS variables.
      </Callout>
      <Callout variant="warning" title="Heads up">
        This action cannot be undone once confirmed.
      </Callout>
      <Callout variant="success" title="All good!">
        Your changes have been saved successfully.
      </Callout>
      <Callout variant="tip">
        Tip: Press <strong>⌘K</strong> to open the command palette.
      </Callout>
    </div>
  );
}
