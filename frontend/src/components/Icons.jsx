import { useState } from "react";

export const GitHubIcon = ({ size, fill, className , onClick }) => {
    return (
        <div className={className} onClick={onClick} id="git-container">
            <svg height={size} width={size} aria-hidden="true" viewBox="0 0 24 24" version="1.1" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                <path id="git-path" fill={fill} d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
            </svg>
        </div>
    );
};

export const LinkDinIcon = ({ size, fill, className, onClick }) => {
    return (
        <div className={className} onClick={onClick} id="linkdin-container">
            <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="linkedin">
                <path id="linkdin-path" fill={fill} d="M55.35,44.17h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11ZM50.8,3.77A45.67,45.67,0,1,0,96.47,49.44,45.72,45.72,0,0,0,50.8,3.77ZM39.38,70a.77.77,0,0,1-.77.76h-8.8a.76.76,0,0,1-.76-.76V40.43a.76.76,0,0,1,.76-.77h8.8a.77.77,0,0,1,.77.77ZM33.9,35.71a5.53,5.53,0,1,1,5.53-5.53A5.52,5.52,0,0,1,33.9,35.71ZM76.62,70a.77.77,0,0,1-.77.76h-8.8a.76.76,0,0,1-.76-.76V54.11c0-4.18-1.49-7-5.23-7a5.65,5.65,0,0,0-5.3,3.78,7.12,7.12,0,0,0-.34,2.52V70a.77.77,0,0,1-.77.77h-8.8a.76.76,0,0,1-.76-.77c0-4.22.11-24.71,0-29.53a.76.76,0,0,1,.76-.77h8.78a.76.76,0,0,1,.77.77v3.63a10.26,10.26,0,0,1,9.31-5.13c6.79,0,11.89,4.44,11.89,14Zm-21.2-25.8v-.11l-.07.11Zm-.07,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Zm0,0h.07v-.11Z"></path>
            </svg>
        </div>
    );
};

export const TwitterIcon = ({ size, fill, className, onClick }) => {
    return (
        <div className={className} onClick={onClick} id="twitter-container">
            <svg width={size}  height={size} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 72 72" viewBox="0 0 72 72" id="twitter-x">
                <switch>
                    <g>
                        <path id="twitter-path" fill={fill}  d="M42.5,31.2L66,6h-6L39.8,27.6L24,6H4l24.6,33.6L4,66
			            h6l21.3-22.8L48,66h20L42.5,31.2z M12.9,10h8l38.1,52h-8L12.9,10z"></path>
                    </g>
                </switch>
            </svg>
        </div>
    );
};

export const DiscordIcon = ({ size, fill, className }) => {
    return (
        <div className={className} id="discord-container">
            <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 72 72" viewBox="0 0 72 72" id="discord">
                <switch>
                    <g>
                        <path fill={fill} id="discord-path"  d="M52,38c0,3.3-2.7,6-6,6s-6-2.7-6-6s2.7-6,6-6S52,34.7,52,38z M26,44c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6
			S29.3,44,26,44z M59,18c-4.3-2.3-10.7-4-15-4l-0.7,0.7c4.6,0.9,9.4,2.9,12.7,5.3c-11.3-5.1-28.7-5.1-40,0
			c3.3-2.4,8.1-4.3,12.7-5.3L28,14c-4.3,0-10.7,1.7-15,4c-5.2,8.9-8.9,20.3-9,32c3.6,3.2,8.9,6.3,16,8l4-4c-4.2-1.5-7.3-3.2-10-6
			c12.7,8.9,31.3,8.9,44,0c-2.7,2.8-5.8,4.5-10,6l4,4c7.1-1.7,12.4-4.8,16-8C67.9,38.3,64.2,26.9,59,18z"></path>
                    </g>
                </switch>
            </svg>
        </div>
    );
};
