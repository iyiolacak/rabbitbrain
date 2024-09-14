"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactCountryFlag from "react-country-flag";

type Languages = {
  value: string;
  label: string;
  region: string;
  shortLabel: string;
  countryCode: string;
};
const languages: Languages[] = [
  {
    value: "en-US",
    label: "English",
    region: "United States",
    shortLabel: "EN",
    countryCode: "US",
  },
  {
    value: "fr-FR",
    label: "Français",
    region: "France",
    shortLabel: "FR",
    countryCode: "FR",
  },
  {
    value: "de-DE",
    label: "Deutsch",
    region: "Deutschland",
    shortLabel: "DE",
    countryCode: "DE",
  },
  {
    value: "tr-TR",
    label: "Türkçe",
    region: "Türkiye",
    shortLabel: "TR",
    countryCode: "TR",
  },
  {
    value: "ja-JP",
    label: "日本語",
    region: "日本",
    shortLabel: "JA",
    countryCode: "JP",
  },
  {
    value: "es-ES",
    label: "Español",
    region: "España",
    shortLabel: "ES",
    countryCode: "ES",
  },
  {
    value: "zh-CN",
    label: "中文",
    region: "中国大陆",
    shortLabel: "ZH",
    countryCode: "CN",
  },
  {
    value: "it-IT",
    label: "Italiano",
    region: "Italia",
    shortLabel: "IT",
    countryCode: "IT",
  },
  {
    value: "ko-KR",
    label: "한국어",
    region: "대한민국",
    shortLabel: "KO",
    countryCode: "KR",
  },
];

export function LanguageSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Languages>(languages[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls="language-list"
          className="flex items-center justify-start w-min rounded-md bg-transparent px-3 py-1 text-[12px] text-zinc-500 shadow-sm hover:bg-gray-50/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {value.shortLabel}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white rounded-md shadow-lg">
        <Command>
          <CommandInput placeholder="Search language..." className="py-3" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  disabled={!!value.value}
                  onSelect={(currentValue) => {
                    const selectedLanguage = languages.find(
                      (lang) => lang.value === currentValue
                    );
                    if (selectedLanguage) {
                      setValue(selectedLanguage);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <div className="mr-2 h-4 w-4">
                    {value.value === language.value ? (
                      <Check className="size-full" />
                    ) : (
                      <ReactCountryFlag
                        countryCode={language.countryCode}
                        className="text-3xl"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{language.label}</span>
                    <span className="text-xs text-gray-500">
                      {language.region}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
