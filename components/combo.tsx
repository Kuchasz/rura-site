import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Icon from "@mdi/react";
import { mdiChevronDoubleDown } from "@mdi/js";
import fuzzysort from "fuzzysort";

export type KeysOfType<T, X> = {
    [P in keyof T]: T[P] extends X ? P : never;
}[keyof T];

type ComboProps<T> = {
    items: T[];
    displayProperty: KeysOfType<T, string>;
    valueProperty?: keyof T;
    name: string;
    id: string;
    placeholder: string;
};

export default function Combo<T>({ name, id, placeholder, items, displayProperty }: ComboProps<T>) {
    const [selectedItem, setSelectedItem] = useState<T>();
    const [query, setQuery] = useState("");

    const filteredItems = query === "" ? items : fuzzysort.go(query, items, { key: displayProperty as string }).map((i) => i.obj);

    return (
        <Combobox
            value={selectedItem}
            onChange={(e) => {
                console.log(e);
                setSelectedItem(e);
            }}
            name={name}
        >
            <div className="relative mt-1">
                
                <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full">
                    <Combobox.Input
                        id={id}
                        placeholder={placeholder}
                        className="w-full rounded-lg bg-transparent py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        value={query}
                        onFocus={()=>{}}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <Icon className="h-5 w-5 text-gray-400" path={mdiChevronDoubleDown}></Icon>
                    </Combobox.Button>
                </div>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredItems.map((item) => (
                            <Combobox.Option
                                onClick={() => setQuery(item[displayProperty] as string)}
                                key={item[displayProperty] as string}
                                className={() => `relative cursor-default select-none py-2 pl-4 pr-4 text-gray-900`}
                                value={item}
                            >
                                <>
                                    <span className={`block truncate font-normal}`}>{item[displayProperty] as string}</span>
                                </>
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
