import { Message } from "./Message";

export class MessageConstants{

    static readonly INVALID_CREDENTIALS = {
        message: 'მონაცემები არასწორია',
        severity: Message.Error
    };

    static readonly EMAIL_AND_PASSWORD_REQUIRED = {
        message: 'ელ-ფოსტის და პაროლის შევსება სავალდებულოა',
        severity: Message.Information
    };

    static readonly INVALID_EMAIL = {
        message: 'მითითებული ელ-ფოსტა რეგისტრირებული არ არის',
        severity: Message.Information
    };

    static readonly UNEXPECTED_ERROR = {
        message: 'დაფიქსირდა გაუთვალისწინებელი შეცდომა',
        severity: Message.Error
    };

    static readonly REGISTRATION_SUCCESS = {
        message: 'რეგისტრაცია წარმატებით დასრულდა',
        severity: Message.Success
    };

    static readonly USER_ALREADY_EXISTS = {
        message: 'მომხმარებელი მითითებული პირადი ნომრით/ელ-ფოსტით უკვე არსებობს. გთხოვთ, სცადოთ თავიდან',
        severity: Message.Information
    };

    static readonly IMAGE_NOT_UPLOADED = {
        message: 'ფოტოსურათი ვერ აიტვირთა. გთხოვთ, სცადოთ თავიდან',
        severity: Message.Error
    };

    static readonly CV_NOT_UPLOADED = {
        message: 'CV ვერ აიტვირთა. გთხოვთ, სცადოთ თავიდან',
        severity: Message.Error
    };

    static readonly FIRSTNAME_IS_REQUIRED = {
        message: 'სახელის შევსება სავალდებულოა',
        severity: Message.Information
    };

    static readonly LASTNAME_IS_REQUIRED = {
        message: 'გვარის შევსება სავალდებულოა',
        severity: Message.Information
    };

    static readonly VALID_PERSONALNUMBER_IS_REQUIRED = {
        message: 'გთხოვთ, მიუთითოთ ვალიდური პირადი ნომერი',
        severity: Message.Information
    };

    static readonly VALID_EMAIL_IS_REQUIRED = {
        message: 'გთხოვთ, მიუთითოთ ვალიდური ელ-ფოსტა',
        severity: Message.Information
    };

    static readonly VALID_PASSWORD_IS_REQUIRED = {
        message: 'გთხოვთ, მიუთითოთ ვალიდური პაროლი, ის უნდა შეიცავდეს მინიმუმ: \nერთ დიდ ასოს \nერთ პატარა ასოს \nერთ ციფრს \nერთ სიმბოლოს',
        severity: Message.Information
    };

    static readonly CATEGORY_IS_REQUIRED = {
        message: 'კატეგორიის შევსება სავალდებულოა',
        severity: Message.Information
    };

    static readonly IMAGE_IS_REQUIRED = {
        message: 'ფოტოსურათის ატვირთვა სავალდებულოა',
        severity: Message.Information
    };

    static readonly CV_IS_REQUIRED = {
        message: 'CVის ატვირთვა სავალდებულოა',
        severity: Message.Information
    };

    static readonly INVALID_OLD_PASSWORD = {
        message: 'ძველი პაროლი არასწორია, გთხოვთ სცადოთ თავიდან',
        severity: Message.Error
    };

    static readonly DIFFERENT_PASSWORDS = {
        message: 'პაროლები ერთმანეთს არ ემთხვევა, გთხოვთ სცადოთ თავიდან',
        severity: Message.Error
    };

    static readonly CHANGE_PASSWORD_SUCCESS = {
        message: 'პაროლი წარმატებით შეიცვალა',
        severity: Message.Success
    };

    static readonly ALL_FIELDS_REQUIRED = {
        message: 'გთხოვთ, შეავსოთ ყველა ველი',
        severity: Message.Information
    };

    static readonly CHANGE_PERSONALNUMBER_SUCCESS = {
        message: 'პირადი ნომერი წარმატებით შეიცვალა',
        severity: Message.Success
    };

    static readonly PERSONALNUMBER_ALREADY_EXISTS = {
        message: 'პირადი ნომერი უკვე არსებობს. გთხოვთ, სცადოთ თავიდან',
        severity: Message.Information
    };

    static readonly CHANGE_EMAIL_SUCCESS = {
        message: 'ელ-ფოსტა წარმატებით შეიცვალა',
        severity: Message.Success
    };

    static readonly EMAIL_ALREADY_EXISTS = {
        message: 'ელ-ფოსტა უკვე არსებობს. გთხოვთ, სცადოთ თავიდან',
        severity: Message.Information
    };

    static readonly ACTIVATION_CODE_SENT = {
        message: 'აქტივაციის კოდი გაგზავნილია ელ-ფოსტაზე',
        severity: Message.Success
    };

    static readonly INVALID_ACTIVATION_CODE = {
        message: 'აქტივაციის კოდი არასწორია, ან ვადაგასულია',
        severity: Message.Error
    };

    static readonly ACTIVATION_CODE_REQUIRED = {
        message: 'აქტივაციის კოდის შევსება სავალდებულოა',
        severity: Message.Information
    };
}